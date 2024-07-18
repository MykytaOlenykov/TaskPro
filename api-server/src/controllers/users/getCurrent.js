const getCurrent = async (req, res) => {
  const { name, email, theme, avatarUrl } = req.user;

  res.json({
    name,
    email,
    theme,
    avatarUrl,
  });
};

module.exports = getCurrent;
