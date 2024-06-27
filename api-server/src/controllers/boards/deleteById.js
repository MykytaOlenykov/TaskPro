const { Board } = require("../../models/board");
const { Column } = require("../../models/column");
const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner_id } = req.user;
  const board = await Board.exists({ _id: id, owner_id });

  if (!board) {
    throw HttpError(404);
  }

  const columns = await Column.find({ board_id: board._id, owner_id });

  if (columns.length > 0) {
    const columnIds = columns.map((column) => column._id);

    await Task.deleteMany({ column_id: { $in: columnIds }, owner_id });
    await Column.deleteMany({ board_id: board._id, owner_id });
  }

  await Board.deleteOne({ _id: id, owner_id });

  res.status(204).send();
};

module.exports = deleteById;
