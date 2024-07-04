const getCurrent = async (req, res) => {
  const { name, email, theme } = req.user;

  res.json({
    name,
    email,
    theme,
  });
};

module.exports = getCurrent;
