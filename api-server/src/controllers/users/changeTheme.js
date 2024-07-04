const { User } = require("../../models/user");

const changeTheme = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  }).select("theme");
  res.json({ theme: result.theme });
};

module.exports = changeTheme;
