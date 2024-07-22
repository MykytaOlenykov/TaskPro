const ejs = require("ejs");
const path = require("path");

const { sendEmail } = require("../../helpers");

const emailTemplate = path.join(
  __dirname,
  "..",
  "..",
  "templates",
  "helpEmail.ejs"
);

const help = async (req, res) => {
  const { email, comment } = req.body;

  const html = await ejs.renderFile(emailTemplate, { userEmail: email });

  const userEmailOptions = {
    to: email,
    subject: "Support",
    html,
  };

  const hostEmailOptions = {
    to: process.env.EMAIL_HOST_USER,
    subject: "Support",
    html: `User email: ${email}.<br/>Comment: ${comment}.`,
  };

  await Promise.all([sendEmail(userEmailOptions), sendEmail(hostEmailOptions)]);

  res.status(201).json({ message: "mail sent" });
};

module.exports = help;
