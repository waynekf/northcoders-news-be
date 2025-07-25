const { fetchUsers } = require("../models/users.model.js");

const getUsers = function (req, res) {
  return fetchUsers().then(({ users }) => {
    if (users.length > 0) {
      res.status(200);
      res.send({ users });
    } else {
      res.status(404);
      res.send({ users: [] });
    }
    return users;
  });
};

module.exports = {
  getUsers,
};
