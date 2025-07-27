const db = require("../db/connection.js");
const {
  fetchArticles,
  fetchArticle,
  fetchComments,
} = require("../models/articles.model.js");

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

const getComments = function (req, res, next) {
  const { article_id } = req.params;
  return fetchArticle(article_id)
    .then(() => fetchComments(article_id))
    .then((comments) => {
      res.status(200).send(comments);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  getArticle,
  getComments,
};
