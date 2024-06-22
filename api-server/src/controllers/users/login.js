const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const { TOKEN_SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(403, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(403, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: "30d" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: {
      name: user.name,
      email: user.email,
    },
    token,
  });
};

module.exports = login;