const db = require("../../db/connection");
const articles = require("../data/development-data/articles");
const topics = require("../data/development-data/topics");

const convertTimestampToDate = function ({ created_at, ...otherProperties }) {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

const getTopics = (topics) =>
  [...topics].map((topic) => [topic.slug, topic.description, topic.img_url]);

const getUsers = (users) =>
  [...users].map((user) => [user.username, user.name, user.avatar_url]);

const getArticles = (articles) =>
  [...articles].map((article) => [
    article.title,
    article.topic,
    article.author,
    article.body,
    convertTimestampToDate({ created_at: article.created_at }).created_at,
    article.votes,
    article.article_img_url,
  ]);

const getComments = (articles, comments) => {
  const getArticleId = (title) =>
    articles.filter((article) => article.title === title)[0].id;

  return [...comments].map((comment) => [
    getArticleId(comment.article_title),
    comment.body,
    comment.votes,
    comment.author,
    convertTimestampToDate({ created_at: comment.created_at }).created_at,
  ]);
};

module.exports = {
  convertTimestampToDate,
  getTopics,
  getUsers,
  getArticles,
  getComments,
};
