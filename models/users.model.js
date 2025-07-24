const db = require("../db/connection.js");

const fetchUsers = function (req, res) {
  return db
    .query("SELECT * FROM Users")
    .then(({ rows: users }) => {
      return { users };
    });
};

module.exports = {
  fetchUsers,
};
