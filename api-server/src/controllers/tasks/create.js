const { Task } = require("../../models/task");

const create = async (req, res) => {
  const { _id: owner_id } = req.user;
  const newTask = await Task.create({ ...req.body, owner_id });
  res.status(201).json({
    _id: newTask._id,
    name: newTask.name,
    comment: newTask.comment,
    deadline: newTask.deadline,
    priority_id: newTask.priority_id,
    column_id: newTask.column_id,
  });
};

module.exports = create;
