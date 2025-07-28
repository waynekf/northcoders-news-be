const db = require("../db/connection.js");

const deleteCommentFromDb = function (comment_id) {
  if (isNaN(comment_id)) {
    return Promise.reject({
      status: 400,
      msg: `Comment id '${comment_id}' ought to be numeric`,
    });
  }
  const sql = `DELETE FROM Comments 
  WHERE comment_id = $1 
  RETURNING *`;

  return db.query(sql, [comment_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        msg: `Comment '${comment_id}' not found`,
      });
    }

    return rows[0];
  });
};

module.exports = {
  deleteCommentFromDb,
};
