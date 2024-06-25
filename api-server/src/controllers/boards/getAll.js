const { Board } = require("../../models/board");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const boards = await Board.find({ owner })
    .populate({
      path: "background_id icon_id",
      select: "-createdAt -updatedAt",
    })
    .select("-createdAt -updatedAt -owner");
  res.json(boards);
};

module.exports = getAll;
