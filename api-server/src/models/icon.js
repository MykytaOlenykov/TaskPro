const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const iconSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

iconSchema.post("save", handleMongooseError);

const Icon = model("icon", iconSchema);

module.exports = {
  Icon,
};
