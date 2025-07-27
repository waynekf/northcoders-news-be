const db = require("../db/connection.js");

const fetchArticles = function () {
  const sql = `SELECT A.author, A.title, A.article_id, A.topic, A.created_at, A.votes, A.article_img_url, COUNT(C.article_id) as comment_count 
    FROM Articles A JOIN Comments C ON A.article_id = C.article_id 
    GROUP BY A.author, A.title, A.article_id, A.topic, A.created_at, A.votes, A.article_img_url 
    ORDER BY A.created_at DESC`;

  return db.query(sql).then(({ rows: articles }) => {
    return { articles };
  });
};

const fetchArticle = function (article_id) {
  const sql = `SELECT author, title, article_id, topic, created_at, votes, article_img_url  
    FROM Articles 
    WHERE article_id = $1`;

  return db.query(sql, [article_id]).then(({ rows: articles }) => {
    const article = articles[0];
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: `article '${article_id}' not found`,
      });
    }

    return article;
  });
};

const fetchComments = function (article_id) {
  const sql = `SELECT *
    FROM Comments 
    WHERE article_id = $1 
    ORDER BY created_at DESC`;
  return db.query(sql, [article_id]).then(({ rows: comments }) => {
    if (comments.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `Messages for article '${article_id}' not found`,
      });
    }

    return { comments };
  });
};

const postCommentToDb = function (article_id, body, author) {
  const sql = `INSERT INTO Comments (article_id, body, author) 
  VALUES ($1, $2, $3)
  RETURNING *`;

  return db.query(sql, [article_id, body, author]).then((data) => {
    const { rowCount } = data;
    if (rowCount === 0) {
      return Promise.reject({
        status: 502,
        msg: `Failure to add comment for article '${article_id}'`,
      });
    }

    return data;
  });
};

module.exports = {
  fetchArticles,
  fetchArticle,
  fetchComments,
  postCommentToDb,
};
