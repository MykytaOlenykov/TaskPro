const { TaskPriority } = require("../../models/task");

const getPriorities = async (req, res) => {
  const priorities = await TaskPriority.find();
  res.json(priorities);
};

module.exports = getPriorities;
