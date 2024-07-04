const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError, createTokens } = require("../../helpers");

const { COOKIE_REFRESH_TOKEN_EXPIRE_TIME } = process.env;

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

  res.cookie("refreshToken", refreshToken, {
    maxAge: Number(COOKIE_REFRESH_TOKEN_EXPIRE_TIME),
    httpOnly: true,
  });

  res.json({
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
    },
    accessToken,
  });
};

module.exports = login;
