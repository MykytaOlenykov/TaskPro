const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner_id } = req.user;
  const result = await Task.findOneAndDelete({ _id: id, owner_id });

  if (!result) {
    throw HttpError(404);
  }

  res.status(204).send();
};

module.exports = deleteById;
