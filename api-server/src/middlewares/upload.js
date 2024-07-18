const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "..", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: function (req, file, cb) {
    const { _id } = req.user;
    cb(null, `${_id}_${file.originalname}`);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
