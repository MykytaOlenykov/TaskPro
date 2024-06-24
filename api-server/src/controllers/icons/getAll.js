const fs = require("node:fs/promises");
const path = require("node:path");

const iconsPath = path.join(__dirname, "..", "..", "static", "icons");

const getAll = async (_, res) => {
  const files = await fs.readdir(iconsPath);

  const svgs = {};

  for (const file of files) {
    if (path.extname(file) === ".svg") {
      const svgContent = await fs.readFile(path.join(iconsPath, file), "utf8");
      svgs[file] = svgContent;
    }
  }

  res.json(svgs);
};

module.exports = getAll;
