const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const create = require("./create");
const updateById = require("./updateById");
const deleteById = require("./deleteById");
const getPriorities = require("./getPriorities");

module.exports = {
  getAll: ctrlWrapper(getAll),
  create: ctrlWrapper(create),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  getPriorities: ctrlWrapper(getPriorities),
};
