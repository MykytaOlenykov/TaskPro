const { Column } = require("../../models/column");
const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner_id } = req.user;
  const result = await Column.exists({ _id: id, owner_id });

  if (!result) {
    throw HttpError(404);
  }

  await Task.deleteMany({ column_id: id, owner_id });
  await Column.deleteOne({ _id: id });

  res.status(204).send();
};

module.exports = deleteById;
