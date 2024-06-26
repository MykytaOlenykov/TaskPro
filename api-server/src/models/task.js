const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError, isValidObjectId } = require("../helpers");

const taskPrioritySchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      required: true,
    },
  },
  { versionKey: false }
);

taskPrioritySchema.post("save", handleMongooseError);

const TaskPriority = model("task_priority", taskPrioritySchema);

const taskSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 255,
      required: true,
    },
    comment: {
      type: String,
      maxlength: 1000,
      default: null,
    },
    deadline: {
      type: Date,
      required: true,
    },
    priority_id: {
      type: Schema.Types.ObjectId,
      ref: "task_priority",
      default: null,
    },
    column_id: {
      type: Schema.Types.ObjectId,
      ref: "column",
      index: true,
      required: true,
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

const nameSchema = Joi.string().trim().max(255).required();
const commentSchema = Joi.string().trim().max(1000);
const deadlineSchema = Joi.date()
  .custom((value, helpers) => {
    const currentUTCDatetime = new Date();
    const currentUTCDate = new Date(
      Date.UTC(
        currentUTCDatetime.getUTCFullYear(),
        currentUTCDatetime.getUTCMonth(),
        currentUTCDatetime.getUTCDate()
      )
    );

    if (value >= currentUTCDate) {
      return value;
    }
    const fieldName = helpers.state.path.join(".");
    return helpers.message(`\"${fieldName}\" should be a date in the future`);
  })
  .required();
const priorityIdSchema = Joi.string().custom((value, helpers) => {
  if (!value) {
    return value;
  }
  return isValidObjectId(value, helpers);
});
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

const validationSchemes = {
  createTask,
  updateTask,
};

module.exports = {
  Task,
  TaskPriority,
  validationSchemes,
};
