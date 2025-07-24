const { fetchTopics } = require("../models/topics.model.js");

const getTopics = function (req, res) {
  return fetchTopics(req, res).then(({topics}) => {
    if (topics.length > 0) {
      res.status(200);
      res.send({ topics });
    } else {
      res.status(404);
      res.send({ topics: [] });
    }
    return topics;
  });
};

module.exports = {
  getTopics,
};
