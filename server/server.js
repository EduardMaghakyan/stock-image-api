import express from "express";
import { graphql } from "graphql";
import schema from "./schema";
import db from "./db";

const query = `
query GetImages($keyword: String!, $offset: Int!) {
  images(keyword: $keyword, offset: $offset) {
    url,
    snippet, 
    thumbnail,
    context
  }
}`;

const PORT = 3000;
const app = express();

app.get("/api/images/:keyword", (req, res) => {
  const params = {
    "keyword": encodeURI(req.params.keyword),
    "offset": req.query.offset ? parseInt(req.query.offset, 10) : 1
  };

  graphql(schema, query, null, null, params).
    then(function(result) {
      db.addItem(req.protocol + "://" + req.get("host") + req.originalUrl);
      res.send(result.data.images);
    }).
    catch((err) => res.send(err));
});

app.get("/api/latest/imagesearch/", (req, res) => {
  res.send(db.getChunk(10));
});

app.listen(PORT);
