const { Background } = require("../../models/background");

const getAll = async (_, res) => {
  const backgrounds = await Background.find();
  res.json(backgrounds);
};

module.exports = getAll;
