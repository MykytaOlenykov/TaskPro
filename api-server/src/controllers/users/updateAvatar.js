const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const rootDir = path.join(__dirname, "..", "..");
const avatarsDir = path.join(rootDir, "static", "avatars");

const updateAvatar = async (req, res) => {
  const { _id, avatarUrl: oldAvatarUrl } = req.user;
  const { filename, path: tmpUpload } = req.file;

  if (oldAvatarUrl) {
    await fs.unlink(path.join(rootDir, oldAvatarUrl)).catch(() => {});
  }

  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tmpUpload, resultUpload);
  const avatarUrl = path.join("static", "avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({ avatarUrl });
};

module.exports = updateAvatar;
