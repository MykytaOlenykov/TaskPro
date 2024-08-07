const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

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
    theme: {
      type: String,
      default: "dark",
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const nameSchema = Joi.string().trim().max(100).required();
const emailSchema = Joi.string().trim().max(255).pattern(emailReg).required();
const passwordSchema = Joi.string().trim().min(8).max(255).required();

const user = Joi.object({
  name: nameSchema,
});

const register = Joi.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

const login = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const theme = Joi.object({
  theme: Joi.string().required(),
});

const help = Joi.object({
  email: emailSchema,
  comment: Joi.string().trim().max(1000).required(),
});

const validationSchemes = {
  user,
  register,
  login,
  theme,
  help,
};

module.exports = {
  User,
  validationSchemes,
};
