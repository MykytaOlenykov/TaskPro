const { Schema, model, isValidObjectId } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const columnSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      required: true,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "board",
      index: true,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

const column = Joi.object({
  name: Joi.string().trim().max(255).required(),
  board: Joi.string()
    .custom((value, helpers) => {
      if (isValidObjectId(value)) {
        return value;
      }
      return helpers.message(`board: ${value} is not valid id`);
    })
    .required(),
});

const validationSchemes = {
  column,
};

module.exports = {
  Column,
  validationSchemes,
};
