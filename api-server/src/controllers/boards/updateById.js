const { Board } = require("../../models/board");
const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const board = await Board.findOneAndUpdate({ owner, _id: id }, req.body, {
    new: true,
  })
    .populate({ path: "background icon", select: "-createdAt -updatedAt" })
    .select("-createdAt -updatedAt -owner");

  if (!board) {
    throw HttpError(404);
  }

  res.json(board);
};

module.exports = updateById;
