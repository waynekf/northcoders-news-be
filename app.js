const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { greet } = require("./controllers/greet.controller.js");
const { getTopics } = require("./controllers/topics.controller.js");
const {
  getArticles,
  getArticle,
  getComments,
  postComment,
} = require("./controllers/articles.controller.js");
const { getUsers } = require("./controllers/users.controller.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/", greet);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id/comments", getComments);

app.get("/api/articles/:article_id", getArticle);

app.post("/api/articles/:article_id/comments", postComment);

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
  next();
});

module.exports = app;
