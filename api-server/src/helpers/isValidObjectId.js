const { isValidObjectId } = require("mongoose");

const isValidId = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  }
  const fieldName = helpers.state.path.join(".");
  return helpers.message(`\"${fieldName}\" ${value} is not valid id`);
};

module.exports = isValidId;
