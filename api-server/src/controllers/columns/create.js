const { Column } = require("../../models/column");

const create = async (req, res) => {
  const { _id: owner_id } = req.user;
  const newColumn = await Column.create({ ...req.body, owner_id });
  res.status(201).json({
    _id: newColumn._id,
    name: newColumn.name,
    board_id: newColumn.board_id,
  });
};

module.exports = create;
