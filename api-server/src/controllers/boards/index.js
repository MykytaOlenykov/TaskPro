const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const create = require("./create");
const updateById = require("./updateById");
const deleteById = require("./deleteById");

module.exports = {
  getAll: ctrlWrapper(getAll),
  create: ctrlWrapper(create),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
