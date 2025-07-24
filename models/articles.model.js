const db = require("../db/connection.js");

const fetchArticles = function (req, res) {
    const sql = `SELECT A.author, A.title, A.article_id, A.topic, A.created_at, A.votes, A.article_img_url, COUNT(C.article_id) as comment_count 
    FROM Articles A JOIN Comments C ON A.article_id = C.article_id 
    GROUP BY A.author, A.title, A.article_id, A.topic, A.created_at, A.votes, A.article_img_url`;

  return db
    .query(sql)
    .then(({ rows: articles }) => {
      return { articles };
    });
};

module.exports = {
  fetchArticles,
};