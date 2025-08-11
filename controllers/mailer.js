
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Email,
    pass: process.env.Password,
  },
});

const sendEmail = async (to, subject,  html) => {
  return transporter.sendMail({
    from: `"Kleenora" <${process.env.Email}>`,
    to,
    subject,
    html,
  });
};

module.exports = { sendEmail };