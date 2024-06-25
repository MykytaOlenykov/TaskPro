const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const create = require("./create");
const updateById = require("./updateById");

module.exports = {
  getAll: ctrlWrapper(getAll),
  create: ctrlWrapper(create),
  updateById: ctrlWrapper(updateById),
};
