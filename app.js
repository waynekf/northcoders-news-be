const express = require("express");
const app = express();
const { greet } = require("./controllers/greet.controller.js");
const { getTopics } = require("./controllers/topics.controller.js");
const { getArticles } = require("./controllers/articles.controller.js");

app.get("/", greet);

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

/*
TODO: UNDERSTAND THIS BETTER BEFORE I IMPLEMENT IT
app.use((err, req, res, next) => {
  console.log(err);
  next(err);
});

Promise.reject({ status: 404, msg: "No topics found" });
*/

module.exports = app;
