const { TaskPriority } = require("../../models/task");

const getPriorities = async (_, res) => {
  const priorities = await TaskPriority.find();
  res.json(priorities);
};

module.exports = getPriorities;
