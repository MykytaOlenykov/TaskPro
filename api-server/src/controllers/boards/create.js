const { Board } = require("../../models/board");

const create = async (req, res) => {
  const { _id: owner } = req.user;
  const newBoard = await Board.create({ ...req.body, owner });
  res.json(newBoard);
};

module.exports = create;
