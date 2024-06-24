const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const boardSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      required: true,
    },
    icon: {
      type: Schema.Types.ObjectId,
      ref: "icon",
      required: true,
    },
    background: {
      type: Schema.Types.ObjectId,
      ref: "background",
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      index: true,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

const board = Joi.object({
  name: Joi.string().trim().max(255).required(),
  icon: Joi.string().trim().required(),
  background: Joi.string().allow(null),
});

const validationSchemes = {
  board,
};

module.exports = {
  Board,
  validationSchemes,
};
