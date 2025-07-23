const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller.js");

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/api/topics", (req, res) => {
  return getTopics(req, res).then((data) => {
    return data;
  });
});

module.exports = app;
