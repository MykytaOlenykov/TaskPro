const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner_id } = req.user;
  const column = await Column.findOneAndUpdate(
    { owner_id, _id: id },
    req.body,
    {
      new: true,
    }
  ).select("-createdAt -updatedAt -owner_id");

  if (!column) {
    throw HttpError(404);
  }

  res.json(column);
};

module.exports = updateById;
