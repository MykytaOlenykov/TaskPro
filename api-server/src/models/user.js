const { Schema, model } = require("mongoose");
const Joi = require("joi");

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

const nameSchema = Joi.string().trim().max(100).required();
const emailSchema = Joi.string().trim().max(255).pattern(emailReg).required();
const passwordSchema = Joi.string().trim().min(8).max(100).required();

const user = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const login = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const validationSchemes = {
  user,
  login,
};

module.exports = {
  User,
  validationSchemes,
};
