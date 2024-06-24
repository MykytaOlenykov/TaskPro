const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const backgroundSchema = new Schema(
  {
    previewUrl: {
      type: String,
      required: true,
    },
    mobile: {
      type: Object,
      required: true,
      baseUrl: {
        type: String,
        required: true,
      },
      largeUrl: {
        type: String,
        required: true,
      },
    },
    tablet: {
      type: Object,
      required: true,
      baseUrl: {
        type: String,
        required: true,
      },
      largeUrl: {
        type: String,
        required: true,
      },
    },
    desktop: {
      type: Object,
      required: true,
      baseUrl: {
        type: String,
        required: true,
      },
      largeUrl: {
        type: String,
        required: true,
      },
    },
  },
  { versionKey: false, timestamps: true }
);

backgroundSchema.post("save", handleMongooseError);

const Background = model("background", backgroundSchema);

module.exports = {
  Background,
};
