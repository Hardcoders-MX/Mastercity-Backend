const nodemailer = require('nodemailer');
const config = require('../../config');

const newTransporter = () => {
  const settings = {
    // host: config.email.host,
    // port: config.email.port,
    // secure: config.email.secure,
    service: 'gmail',
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  };
  return nodemailer.createTransport(settings);
};

const sendEmail = (email, subject, body) => {
  const settings = {
    from: `Platzicity 🏙" ${config.email.user}`,
    to: email,
    subject,
    html: body,
  };

  const transporter = newTransporter();

  return transporter.sendMail(settings);
};

module.exports = sendEmail;
