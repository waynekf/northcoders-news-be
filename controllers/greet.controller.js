const greet = function (req, res) {
  res.status(200).send("Hello World!");
};

module.exports = {
  greet,
};
