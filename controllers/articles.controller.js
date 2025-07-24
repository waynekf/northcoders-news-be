const db = require("../db/connection.js");
const { fetchArticles } = require("../models/articles.model.js");

const getArticles = function (req, res) {
  return fetchArticles(req, res).then(({articles}) => {
    if (articles.length > 0) {
      res.status(200);
      res.send({ articles });
    } else {
      res.status(404);
      res.send({ articles: [] });
    }
    return articles;
  });
};

module.exports = {
  getArticles,
};
