const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError } = require("../helpers");

const { REFRESH_TOKEN_SECRET_KEY } = process.env;

const verifyRefreshToken = async (req, _, next) => {
  const { refreshToken } = req.cookies;

  try {
    const { id } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
      return next(HttpError(401));
    }

    req.user = user;

    next();
  } catch {
    next(HttpError(401));
  }
};

module.exports = verifyRefreshToken;
