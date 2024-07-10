const { Board } = require("../../models/board");

const getAll = async (req, res) => {
  const { _id: owner_id } = req.user;
  const boards = await Board.find({ owner_id }).select(
    "-createdAt -updatedAt -owner_id"
  );
  res.json(boards);
};

module.exports = getAll;
