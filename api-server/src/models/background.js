const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const backgroundSchema = new Schema(
  {
    previewUrl: {
      type: String,
      required: true,
    },
    baseUrl: {
      type: String,
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
