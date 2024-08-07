const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { Board } = require("./board");
const { handleMongooseError, isValidObjectId } = require("../helpers");

const columnSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      required: true,
    },
    board_id: {
      type: Schema.Types.ObjectId,
      ref: "board",
      index: true,
      required: true,
      validate: {
        validator: async function (value) {
          return await Board.exists({ _id: value });
        },
        message: "board with the specified ID does not exist",
      },
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

columnSchema.post("save", handleMongooseError);

const Column = model("column", columnSchema);

const nameSchema = Joi.string().trim().max(100).required();
const boardSchema = Joi.string().custom(isValidObjectId).required();

const createColumn = Joi.object({
  name: nameSchema,
  board_id: boardSchema,
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
