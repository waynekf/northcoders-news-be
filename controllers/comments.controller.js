const { deleteCommentFromDb } = require("../models/comments.model.js");

const deleteComment = function (req, res, next) {
  const { comment_id } = req.params;
  return deleteCommentFromDb(comment_id)
    .then((data) => {
      res.status(204);
      res.send();
      return;
    })
    .catch(next);
};

module.exports = {
  deleteComment,
};
