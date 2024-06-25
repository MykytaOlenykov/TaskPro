const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const create = require("./create");

module.exports = {
  getAll: ctrlWrapper(getAll),
  create: ctrlWrapper(create),
};
