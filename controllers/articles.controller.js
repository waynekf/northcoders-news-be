const db = require("../db/connection.js");
const { fetchArticles, fetchArticle } = require("../models/articles.model.js");

const getArticles = function (req, res) {
  return fetchArticles().then(({ articles }) => {
    if (articles.length > 0) {
      res.status(200);
      res.send({ articles });
    } else {
      res.status(404);
      res.send({ articles: [] });
    }
  });
};

const getArticle = function (req, res, next) {
  const { article_id } = req.params;
  return fetchArticle(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  getArticle,
};
