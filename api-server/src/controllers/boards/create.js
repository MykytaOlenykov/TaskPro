const { Board } = require("../../models/board");

const create = async (req, res) => {
  const { _id: owner } = req.user;
  const newBoard = await Board.create({ ...req.body, owner });
  const board = await Board.findById(newBoard._id)
    .populate({
      path: "background_id icon_id",
      select: "-createdAt -updatedAt",
    })
    .select("-createdAt -updatedAt -owner");
  res.status(201).json(board);
};

module.exports = create;
