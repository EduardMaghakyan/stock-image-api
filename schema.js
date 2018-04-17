import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt
} from "graphql";
import "isomorphic-fetch";
import dotenv from "dotenv";
dotenv.config();

const { API_KEY, CSE_ID } = process.env;

const getRequestUrl = (keyword, offset = 1) => {
  let startIndex = offset === 1 ? offset : offset * 10;

  return (
    "https://www.googleapis.com/customsearch/v1?q=" +
    `${keyword}&` +
    `cx=${CSE_ID}&` +
    `key=${API_KEY}&` +
    "searchType=image&" +
    `start=${startIndex}`
  );
};

const StockImageType = new GraphQLObjectType({
  "name": "image",
  "fields": () => ({
    "context": {
      "type": GraphQLString,
      "resolve": (item) => item.image.contextLink
    },
    "snippet": {
      "type": GraphQLString,
      "resolve": (item) => item.htmlSnippet
    },
    "thumbnail": {
      "type": GraphQLString,
      "resolve": (item) => item.image.thumbnailLink
    },
    "url": {
      "type": GraphQLString,
      "resolve": (item) => item.link
    }
  })
});

const quetyType = new GraphQLObjectType({
  "name": "Query",
  "fields": () => ({
    "images": {
      "args": {
        "keyword": { "type": GraphQLString },
        "offset": { "type": GraphQLInt }
      },
      "type": new GraphQLList(StockImageType),
      "resolve": (root, args) =>
        fetch(getRequestUrl(args.keyword, args.offset)).
          then((response) => response.json()).
          then((data) => data.items).
          catch((err) => console.log(err))
    }
  })
});

export default new GraphQLSchema({ "query": quetyType });
