const { ctrlWrapper } = require("../../helpers");

const getAll = require("./getAll");
const getById = require("./getById");
const create = require("./create");
const updateById = require("./updateById");
const deleteById = require("./deleteById");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  create: ctrlWrapper(create),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
