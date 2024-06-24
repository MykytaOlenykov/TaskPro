const getIcons = async (_, res) => {
  const iconsDir = path.join(staticPath, "icons");

  const files = await fs.readdir(iconsDir);

  const svgs = {};

  for (const file of files) {
    if (path.extname(file) === ".svg") {
      const svgContent = await fs.readFile(path.join(iconsDir, file), "utf8");
      svgs[file] = svgContent;
    }
  }

  res.json(svgs);
};
