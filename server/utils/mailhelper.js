require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_MAIL_HOST,
  port: process.env.SMTP_MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL_USERNAME,
    pass: process.env.SMTP_MAIL_PASSWORD,
  },
});

exports.mailHelper = async (options) => {
  const message = {
    from: process.env.SMTP_MAIL_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(message);
};
