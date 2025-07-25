const db = require("../db/connection.js");

const fetchTopics = function () {
  return db
    .query("SELECT slug, description FROM Topics")
    .then(({ rows: topics }) => {
      return { topics };
    });
};

module.exports = {
  fetchTopics,
};
