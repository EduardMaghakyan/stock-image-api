import express from "express";
import { graphql } from "graphql";
import schema from "./schema/schema";
import db from "./db";

const query = `
query GetImages($keyword: String!, $offset: Int!) {
  images(keyword: $keyword, offset: $offset) {
    id,
    url,
    snippet, 
    thumbnail,
    context
  }
}`;

const PORT = 8080;
const app = express();

const createUrl = req => {
  return req.protocol + "://" + req.get("host") + req.originalUrl;
};

// Add headers
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/api/images/:keyword", (req, res) => {
  const params = {
    keyword: encodeURI(req.params.keyword),
    offset: req.query.offset ? parseInt(req.query.offset, 10) : 1
  };

  graphql(schema, query, null, null, params)
    .then(function(result) {
      db.addItem(createUrl(req));
      res.send(result.data.images);
    })
    .catch(err => res.send(err));
});

app.get("/api/latest/imagesearch/", (req, res) => {
  res.send(db.getChunk(10));
});

app.listen(PORT);
