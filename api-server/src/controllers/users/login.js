const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError, createTokens } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(403, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(403, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const { accessToken, refreshToken } = createTokens(payload);

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.json({
    user: {
      name: user.name,
      email: user.email,
    },
    accessToken,
    refreshToken,
  });
};

module.exports = login;
