const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner_id } = req.user;
  const task = await Task.findOneAndUpdate({ owner_id, _id: id }, req.body, {
    new: true,
  }).select("-createdAt -updatedAt -owner_id");

  if (!task) {
    throw HttpError(404);
  }

  res.json(task);
};

module.exports = updateById;
