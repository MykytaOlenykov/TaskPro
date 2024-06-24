const fs = require("node:fs/promises");
const path = require("node:path");

const { Icon } = require("../../models/icon");

const rootPath = path.join(__dirname, "..", "..");

const getAll = async (_, res) => {
  const icons = await Icon.find();

  const svgs = [];

  for (const { _id, url } of icons) {
    const svgContent = await fs.readFile(path.join(rootPath, url), "utf8");
    svgs.push({
      _id,
      url,
      svg: svgContent,
    });
  }

  res.json(svgs);
};

module.exports = getAll;
