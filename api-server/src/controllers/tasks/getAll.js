const { Column } = require("../../models/column");
const { Task } = require("../../models/task");

const getAll = async (req, res) => {
  const { _id: owner_id } = req.user;
  const { column_id } = req.query;

  const column = await Column.exists({ owner_id, _id: column_id });

  if (!column) {
    throw HttpError(404);
  }

  const tasks = await Task.find({ owner_id, column_id }).select(
    "-createdAt -updatedAt -owner_id"
  );

  res.json(tasks);
};

module.exports = getAll;
