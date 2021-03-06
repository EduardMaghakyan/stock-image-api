import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} from "graphql";
import uuidv4 from "uuid/v4";
import { getImages } from "./clientRequest";

const StockImages = new GraphQLObjectType({
  name: "image",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: () => uuidv4()
    },
    context: {
      type: GraphQLString,
      resolve: item => item.image.contextLink
    },
    snippet: {
      type: GraphQLString,
      resolve: item => item.htmlSnippet
    },
    thumbnail: {
      type: GraphQLString,
      resolve: item => item.image.thumbnailLink
    },
    url: {
      type: GraphQLString,
      resolve: item => item.link
    }
  })
});

export default {
  args: {
    keyword: { type: GraphQLString },
    offset: { type: GraphQLInt }
  },
  type: new GraphQLList(StockImages),
  resolve: (root, args) => getImages(args.keyword, args.offset)
};
