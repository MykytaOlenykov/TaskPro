const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const refresh = require("./refresh");
const getCurrent = require("./getCurrent");
const changeTheme = require("./changeTheme");
const update = require("./update");
const updateAvatar = require("./updateAvatar");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
  getCurrent: ctrlWrapper(getCurrent),
  changeTheme: ctrlWrapper(changeTheme),
  update: ctrlWrapper(update),
  updateAvatar: ctrlWrapper(updateAvatar),
};
