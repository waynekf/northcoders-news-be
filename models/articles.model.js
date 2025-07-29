const db = require("../db/connection.js");

const fetchCommentCount = function (article_id) {
  return fetchArticles("article_id", "ASC", null).then(({ articles }) => {
    const article = articles.find(x => (x.article_id === +article_id));
    return article;
  });
};

const fetchArticles = function (sort_by, order, topic) {
  const sql = `SELECT A.author, A.title, A.article_id, A.topic, A.created_at, A.votes, A.article_img_url, COUNT(C.article_id) as comment_count 
    FROM Articles A JOIN Comments C ON A.article_id = C.article_id 
    WHERE A.topic = ${topic ? "'" + topic + "'" : "A.topic"}
    GROUP BY A.author, A.title, A.article_id, A.topic, A.created_at, A.votes, A.article_img_url 
    ORDER BY ${"A.".concat(sort_by).concat(" ").concat(order)}`;
  const fields = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  const sorts = ["ASC", "DESC"];
  if (fields.indexOf(sort_by) === -1 || sorts.indexOf(order) === -1) {
    return Promise.reject({
      status: 400,
      msg: `Unable to return any articles due to a malformed query string. Are you sure the specified sort field exists?`,
    });
  }

  return db.query(sql).then(({ rows: articles }) => {
    if (articles.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `No articles found`,
      });
    }
    return { articles };
  });
};

const fetchArticle = function (article_id) {
  if (isNaN(article_id)) {
    return Promise.reject({
      status: 400,
      msg: `Article '${article_id}' must be numeric`,
    });
  }

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

const incrementArticleVotes = function (article_id, increment) {
  if (isNaN(increment)) {
    return Promise.reject({
      status: 400,
      msg: `Unable to patch article '${article_id}' as number of votes cannot be a non-integer`,
    });
  }
  if (+increment === 0) {
    return Promise.reject({
      status: 400,
      msg: `Unable to patch article '${article_id}' as number of votes must be non-zero`,
    });
  }
  const sql = `UPDATE Articles 
  SET votes = votes + $2
  WHERE article_id = $1
  RETURNING *`;

  return db.query(sql, [article_id, +increment]).then((data) => {
    const { rowCount } = data;
    if (rowCount === 0) {
      return Promise.reject({
        status: 502,
        msg: `Failure to update article '${article_id}'`,
      });
    }

    return data;
  });
};

module.exports = {
  fetchArticles,
  fetchCommentCount,
  fetchArticle,
  fetchComments,
  postCommentToDb,
  incrementArticleVotes,
};
