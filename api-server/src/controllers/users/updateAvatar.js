const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models/user");

const staticDir = path.join(__dirname, "..", "..", "static");
const avatarsDir = path.join(staticDir, "avatars");

const updateAvatar = async (req, res) => {
  const { _id, avatarUrl: oldAvatarUrl } = req.user;
  const { filename, path: tmpUpload } = req.file;

  if (oldAvatarUrl) {
    await fs.unlink(path.join(staticDir, oldAvatarUrl)).catch(() => {});
  }

  const resultUpload = path.join(avatarsDir, filename);

  const avatarUrl = path.join(path.sep, "avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarUrl });

  res.json({ avatarUrl });
};

module.exports = updateAvatar;
