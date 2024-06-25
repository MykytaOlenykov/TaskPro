const { Column } = require("../../models/column");

const create = async (req, res) => {
  const { _id: owner } = req.user;
  const newColumn = await Column.create({ ...req.body, owner });
  res.status(201).json({
    _id: newColumn._id,
    name: newColumn.name,
    board: newColumn.board,
  });
};

module.exports = create;
