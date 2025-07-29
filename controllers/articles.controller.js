const db = require("../db/connection.js");
const {
  fetchArticles,
  fetchArticle,
  fetchComments,
  postCommentToDb,
  incrementArticleVotes,
  fetchCommentCount,
} = require("../models/articles.model.js");

const getArticles = function (req, res) {
  const { sort_by = "created_at", order = "DESC", topic } = req.query;
  return fetchArticles(sort_by, order, topic).then(({ articles }) => {
    res.status(200);
    res.send({ articles });
  });
};

const getArticle = async function (req, res, next) {
  const { article_id } = req.params;
  const xxx = await fetchCommentCount(article_id);
  return fetchArticle(article_id)
    .then((article) => {
      if (article) {
        res.status(200).send({ ...article, comment_count: xxx.comment_count });
      } else {
        res.status(200).send({ article });
      }
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

const postComment = function (req, res, next) {
  const { article_id } = req.params;
  const { body, author } = req.body;
  return fetchArticle(article_id)
    .then(() => postCommentToDb(article_id, body, author))
    .then((result) => {
      if (result) {
        const { rows } = result;
        res.status(200).send(rows[0]);
      }
    })
    .catch(next);
};

const patchArticle = function (req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  return fetchArticle(article_id)
    .then(() => incrementArticleVotes(article_id, inc_votes))
    .then((result) => {
      if (result) {
        const { rows } = result;
        res.status(200).send(rows[0]);
      }
    })
    .catch(next);
};

module.exports = {
  getArticles,
  getArticle,
  getComments,
  postComment,
  patchArticle,
};
