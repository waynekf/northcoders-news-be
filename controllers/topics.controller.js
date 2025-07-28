const { fetchTopics } = require("../models/topics.model.js");

const getTopics = function (req, res) {
  return fetchTopics().then(({ topics }) => {
    res.status(200);
    res.send({ topics });
    return topics;
  });
};

module.exports = {
  getTopics,
};
