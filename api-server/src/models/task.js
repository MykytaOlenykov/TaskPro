const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError, isValidObjectId } = require("../helpers");
const { Column } = require("./column");

const taskPrioritySchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      required: true,
    },
    color: {
      type: String,
      maxlength: 100,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

taskPrioritySchema.post("save", handleMongooseError);

const TaskPriority = model("task_priority", taskPrioritySchema);

const deadlineReg = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 100,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 1000,
      default: null,
    },
    deadline: {
      type: String,
      match: deadlineReg,
      required: true,
    },
    priority_id: {
      type: Schema.Types.ObjectId,
      ref: "task_priority",
      default: null,
      validate: {
        validator: async function (value) {
          if (value === null) return true;
          return await TaskPriority.exists({ _id: value });
        },
        message: "task_priority with the specified ID does not exist",
      },
    },
    column_id: {
      type: Schema.Types.ObjectId,
      ref: "column",
      index: true,
      required: true,
      validate: {
        validator: async function (value) {
          return await Column.exists({ _id: value });
        },
        message: "column with the specified ID does not exist",
      },
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

taskSchema.post("save", handleMongooseError);

const Task = model("task", taskSchema);

const nameSchema = Joi.string().trim().max(100).required();
const commentSchema = Joi.string().trim().max(1000).allow(null);
const deadlineSchema = Joi.string()
  .pattern(deadlineReg)
  .custom((value, helpers) => {
    const currentUTCDatetime = new Date();
    const currentUTCDate = new Date(
      Date.UTC(
        currentUTCDatetime.getUTCFullYear(),
        currentUTCDatetime.getUTCMonth(),
        currentUTCDatetime.getUTCDate()
      )
    );

    const parsedValue = new Date(value);
    const fieldName = helpers.state.path.join(".");
    const [valueYear, valueMonth, valueDate] = value.split("-");

    if (
      parsedValue.getUTCFullYear() !== Number(valueYear) ||
      parsedValue.getUTCMonth() !== Number(valueMonth) - 1 ||
      parsedValue.getUTCDate() !== Number(valueDate)
    ) {
      return helpers.message(`\"${fieldName}\" invalide date`);
    }
    if (parsedValue < currentUTCDate) {
      return helpers.message(`\"${fieldName}\" should be a date in the future`);
    }
    return value;
  })
  .required();
const priorityIdSchema = Joi.string()
  .custom((value, helpers) => {
    if (!value) {
      return value;
    }
    return isValidObjectId(value, helpers);
  })
  .allow(null);
const columnIdSchema = Joi.string().custom(isValidObjectId).required();

const createTask = Joi.object({
  name: nameSchema,
  comment: commentSchema,
  deadline: deadlineSchema,
  priority_id: priorityIdSchema,
  column_id: columnIdSchema,
});

const updateTask = Joi.object({
  name: nameSchema,
  comment: commentSchema,
  deadline: deadlineSchema,
  priority_id: priorityIdSchema,
});

const changeTaskColumnId = Joi.object({
  column_id: columnIdSchema,
});

const validationSchemes = {
  createTask,
  updateTask,
  changeTaskColumnId,
};

module.exports = {
  Task,
  TaskPriority,
  validationSchemes,
};
