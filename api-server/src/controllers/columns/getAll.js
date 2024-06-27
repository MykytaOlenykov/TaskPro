const { Column } = require("../../models/column");

const getAll = async (req, res) => {
  const { _id: owner_id } = req.user;
  const { board_id } = req.query;

  const columns = await Column.find({ owner_id, board_id }).select(
    "-createdAt -updatedAt -owner_id"
  );

  res.json(columns);
};

module.exports = getAll;
