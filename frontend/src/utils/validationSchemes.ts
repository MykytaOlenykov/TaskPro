import * as yup from "yup";

const name = yup.string().trim().max(100).required();
const email = yup
  .string()
  .trim()
  .max(255)
  .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/)
  .required();
const password = yup.string().trim().min(8).max(255).required();

const registerSchema = yup.object({
  name,
  email,
  password,
});

export { registerSchema };
