const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError, isValidObjectId } = require("../helpers");

const boardSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      required: true,
    },
    icon_id: {
      type: Schema.Types.ObjectId,
      ref: "icon",
      required: true,
    },
    background_id: {
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
  icon_id: Joi.string().custom(isValidObjectId).required(),
  background_id: Joi.string()
    .custom((value, helpers) => {
      if (!value) {
        return value;
      }
      return isValidObjectId(value, helpers);
    })
    .allow(null),
});

const validationSchemes = {
  board,
};

module.exports = {
  Board,
  validationSchemes,
};
