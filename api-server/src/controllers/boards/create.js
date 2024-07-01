const { Board } = require("../../models/board");

const create = async (req, res) => {
  const { _id: owner_id } = req.user;
  const newBoard = await Board.create({ ...req.body, owner_id });
  const board = await Board.findById(newBoard._id)
    .populate("background_id icon_id")
    .select("-createdAt -updatedAt -owner_id");
  res.status(201).json({
    _id: board._id,
    name: board.name,
    background: board.background_id,
    icon: board.icon_id,
  });
};

module.exports = create;
