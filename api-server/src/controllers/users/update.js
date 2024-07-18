const { User } = require("../../models/user");

const update = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw HttpError(404);
  }

  res.json({
    name: user.name,
  });
};

module.exports = update;
