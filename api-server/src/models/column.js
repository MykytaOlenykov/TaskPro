const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError, isValidObjectId } = require("../helpers");

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

const nameSchema = Joi.string().trim().max(255).required();
const boardSchema = Joi.string().custom(isValidObjectId).required();

const createColumn = Joi.object({
  name: nameSchema,
  board: boardSchema,
});

const updateColumn = Joi.object({
  name: nameSchema,
});

const validationSchemes = {
  createColumn,
  updateColumn,
};

module.exports = {
  Column,
  validationSchemes,
};
