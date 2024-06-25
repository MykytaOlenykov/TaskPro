const { Background } = require("../../models/background");

const getAll = async (_, res) => {
  const backgrounds = await Background.find().select("-createdAt -updatedAt");
  res.json(backgrounds);
};

module.exports = getAll;
