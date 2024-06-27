const { Column } = require("../../models/column");
const { Task } = require("../../models/task");

const getAll = async (req, res) => {
  const { _id: owner_id } = req.user;
  const { column_id } = req.query;

  const columns = await Column.find({
    owner_id,
    _id: { $in: column_id?.split(",") ?? [] },
  });

  const tasks = await Task.find({
    owner_id,
    column_id: { $in: columns.map(({ _id }) => _id) },
  }).select("-createdAt -updatedAt -owner_id");

  res.json(tasks);
};

module.exports = getAll;
