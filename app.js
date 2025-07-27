const express = require("express");
const app = express();
const { greet } = require("./controllers/greet.controller.js");
const { getTopics } = require("./controllers/topics.controller.js");
const {
  getArticles,
  getArticle,
  getComments,
} = require("./controllers/articles.controller.js");
const { getUsers } = require("./controllers/users.controller.js");

app.get("/", greet);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id/comments", getComments);

app.get("/api/articles/:article_id", getArticle);

app.use((err, req, res, next) => {
  console.log(err);

  if (err.status === 404) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    res.status(500).send({ msg: "Internal Server Error" });
  }
  next();
});

module.exports = app;
