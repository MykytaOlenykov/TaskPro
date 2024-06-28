const { User } = require("../../models/user");
const { createTokens } = require("../../helpers");

const { COOKIE_REFRESH_TOKEN_EXPIRE_TIME } = process.env;

const refresh = async (req, res) => {
  const { _id } = req.user;

  const { accessToken, refreshToken } = createTokens({ id: _id });

  await User.findByIdAndUpdate(_id, { accessToken, refreshToken });

  res.cookie("refreshToken", refreshToken, {
    maxAge: Number(COOKIE_REFRESH_TOKEN_EXPIRE_TIME),
    httpOnly: true,
  });

  res.json({
    accessToken,
  });
};

module.exports = refresh;
