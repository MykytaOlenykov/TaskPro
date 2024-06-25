const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { board_id } = req.query;

  if (!board_id) {
    throw HttpError(400, "board_id query is required");
  }

  const columns = await Column.find({ owner, board: board_id }).select(
    "-createdAt -updatedAt -owner"
  );

  res.json(columns);
};

module.exports = getAll;
