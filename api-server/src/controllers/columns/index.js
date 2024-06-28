const { ctrlWrapper } = require("../../helpers");

const create = require("./create");
const updateById = require("./updateById");
const deleteById = require("./deleteById");

module.exports = {
  create: ctrlWrapper(create),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
