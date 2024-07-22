const nodemailer = require("nodemailer");

const { EMAIL_HOST_USER, EMAIL_HOST_PASSWORD } = process.env;

const config = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_HOST_USER,
    pass: EMAIL_HOST_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL_HOST_USER };
  await transporter.sendMail(email);
  return true;
};

module.exports = sendEmail;
