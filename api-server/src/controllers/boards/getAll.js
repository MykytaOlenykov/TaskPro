const { Board } = require("../../models/board");

const getAll = async (req, res) => {
  const { _id: owner_id } = req.user;
  const boards = await Board.find({ owner_id })
    .populate("background_id icon_id")
    .select("-createdAt -updatedAt -owner_id");
  res.json(
    boards.map((board) => ({
      _id: board._id,
      name: board.name,
      background: board.background_id,
      icon: board.icon_id,
    }))
  );
};

module.exports = getAll;
