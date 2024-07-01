const { Board } = require("../../models/board");
const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner_id } = req.user;
  const board = await Board.findOneAndUpdate({ owner_id, _id: id }, req.body, {
    new: true,
    runValidators: true,
  })
    .populate("background_id icon_id")
    .select("-createdAt -updatedAt -owner_id");

  if (!board) {
    throw HttpError(404);
  }

  res.json({
    _id: board._id,
    name: board.name,
    background: board.background_id,
    icon: board.icon_id,
  });
};

module.exports = updateById;
