const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const backgroundTypeSchema = new Schema(
  {
    baseUrl: {
      type: String,
      required: true,
    },
    largeUrl: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const backgroundSchema = new Schema(
  {
    previewUrl: {
      type: String,
      required: true,
    },
    mobile: {
      type: backgroundTypeSchema,
      required: true,
    },
    tablet: {
      type: backgroundTypeSchema,
      required: true,
    },
    desktop: {
      type: backgroundTypeSchema,
      required: true,
    },
  },
  { versionKey: false }
);

backgroundSchema.post("save", handleMongooseError);

const Background = model("background", backgroundSchema);

module.exports = {
  Background,
};
