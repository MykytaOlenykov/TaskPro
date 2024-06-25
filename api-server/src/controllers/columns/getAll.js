const { Board } = require("../../models/board");
const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id: owner_id } = req.user;
  const { board_id } = req.query;

  const board = await Board.findOne({ owner_id, _id: board_id });

  if (!board) {
    throw HttpError(404);
  }

  if (!board_id) {
    throw HttpError(400, "board_id query is required");
  }

  const columns = await Column.find({ owner_id, board_id }).select(
    "-createdAt -updatedAt -owner_id"
  );

  res.json(columns);
};

module.exports = getAll;
