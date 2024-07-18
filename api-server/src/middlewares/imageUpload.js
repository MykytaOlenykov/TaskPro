const multer = require("multer");
const path = require("path");

const tmpDir = path.join(__dirname, "..", "tmp");

const whitelist = ["image/png", "image/jpeg", "image/jpg"];

const fileFilter = (_, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error("file is not allowed"));
  }

  cb(null, true);
};

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: function (req, file, cb) {
    const { _id } = req.user;
    cb(null, `${_id}_${file.originalname}`);
  },
});

const imageUpload = multer({
  storage: multerConfig,
  fileFilter,
});

module.exports = imageUpload;
