const { Schema, model } = require("mongoose");

const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      required: true,
    },
    email: {
      type: String,
      maxlength: 255,
      match: emailReg,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

module.exports = {
  User,
};
