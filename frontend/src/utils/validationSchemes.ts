import * as yup from "yup";

// Auth

const name = yup
  .string()
  .trim()
  .max(100, "Name must be at most 100 characters long.")
  .required("Name is required.");

const email = yup
  .string()
  .trim()
  .max(255, "Email must be at most 255 characters long.")
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "Email must be a valid email address."
  )
  .required("Email is required.");

const password = yup
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long.")
  .max(255, "Password must be at most 255 characters long.")
  .required("Password is required.");

const registerSchema = yup.object({
  name,
  email,
  password,
});

const logInSchema = yup.object({
  email,
  password: yup
    .string()
    .trim()
    .max(255, "Password must be at most 255 characters long.")
    .required("Password is required."),
});

// Board

const titleSchema = yup
  .string()
  .trim()
  .max(100, "Title must be at most 100 characters long.")
  .required("Title is required.");

const boardSchema = yup.object({
  name: titleSchema,
  icon_id: yup.string().trim().required("Icon is required."),
  background_id: yup.string().nullable(),
});

// Column

const columnSchema = yup.object({
  name: titleSchema,
});

// Task

const taskSchema = yup.object({
  name: titleSchema,
  comment: yup
    .string()
    .trim()
    .max(1000, "Comment must be at most 1000 characters long."),
  deadline: yup
    .date()
    .nullable()
    .test("is-valid-date", "", (value) => {
      if (!value) return false;
      if (Number.isNaN(value.getTime())) return false;

      const currentDatetime = new Date();
      const currentUTCDate = new Date(
        Date.UTC(
          currentDatetime.getUTCFullYear(),
          currentDatetime.getUTCMonth(),
          currentDatetime.getUTCDate()
        )
      );

      const valueUTC = new Date(
        Date.UTC(
          value.getUTCFullYear(),
          value.getUTCMonth(),
          value.getUTCDate()
        )
      );

      console.log(currentUTCDate, new Date());
      console.log(valueUTC, value);

      return valueUTC < currentUTCDate;
    })
    .required("Deadline is required."),
  priority_id: yup.string(),
});

export { registerSchema, logInSchema, boardSchema, columnSchema, taskSchema };
