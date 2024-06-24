const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");

module.exports = {
  getAll: ctrlWrapper(getAll),
};
