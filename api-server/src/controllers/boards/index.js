const { ctrlWrapper } = require("../../helpers");

const create = require("./create");

module.exports = {
  create: ctrlWrapper(create),
};
