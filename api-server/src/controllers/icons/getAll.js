const { Icon } = require("../../models/icon");

const getAll = async (_, res) => {
  const icons = await Icon.find();
  res.json(icons);
};

module.exports = getAll;
