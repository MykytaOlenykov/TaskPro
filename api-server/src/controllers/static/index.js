const { ctrlWrapper } = require("../../helpers");

const getIcons = require("./getIcons");

module.exports = {
  getIcons: ctrlWrapper(getIcons),
};
