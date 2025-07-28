const db = require("../db/connection.js");

const fetchTopics = function () {
  return db
    .query("SELECT slug, description FROM Topics")
    .then(({ rows: topics }) => {
      if (topics.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `No topics found`,
        });
      }
      return { topics };
    });
};

module.exports = {
  fetchTopics,
};
