import { GraphQLObjectType, GraphQLSchema } from "graphql";
import stockImages from "./stockImages";

const queryType = new GraphQLObjectType({
  "name": "Query",
  "fields": () => ({ "images": stockImages })
});

export default new GraphQLSchema({ "query": queryType });
