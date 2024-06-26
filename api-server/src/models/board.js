const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { Icon } = require("./icon");
const { Background } = require("./background");
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
      validate: {
        validator: async function (value) {
          return await Icon.exists({ _id: value });
        },
        message: "icon with the specified ID does not exist",
      },
    },
    background_id: {
      type: Schema.Types.ObjectId,
      ref: "background",
      default: null,
      validate: {
        validator: async function (value) {
          if (value === null) return true;
          return await Background.exists({ _id: value });
        },
        message: "background with the specified ID does not exist",
      },
    },
    owner_id: {
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
