const db = require("../db/connection.js");

const getTopics = function (req, res) {
  return db
    .query("SELECT slug, description FROM Topics")
    .then(({ rows: topics }) => {
      if (topics.length > 0) {
        res.send({ topics });
        res.status(200);
      } else {
        res.status(404);
        res.send({ msg: "No topics found" });
      }
      return topics;
    });
};

module.exports = {
  getTopics,
};
