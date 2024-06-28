const { Board } = require("../../models/board");
const { Column } = require("../../models/column");
const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner_id } = req.user;
  const board = await Board.findOne({ _id: id, owner_id })
    .populate("background_id icon_id")
    .select("-createdAt -updatedAt");

  if (!board) {
    throw HttpError(404);
  }

  const columns = await Column.find({ board_id: board._id }).select(
    "-createdAt -updatedAt"
  );

  const tasks = columns.length
    ? await Task.find({
        column_id: {
          $in: columns.map(({ _id }) => _id),
        },
      }).select("-createdAt -updatedAt")
    : [];

  res.json({
    _id: board._id,
    name: board.name,
    background: board.background_id,
    icon: board.icon_id,
    columns,
    tasks,
  });
};

module.exports = getById;
