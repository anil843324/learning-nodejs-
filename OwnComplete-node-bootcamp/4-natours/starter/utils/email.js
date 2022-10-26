const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1 create a transpoter
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // Active in gamil 'less secure app" option
  });

  // 2 Defnie the email options
  const mailOptions = {
    from: 'anil kumar <hello@anil.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: "<b>Hello world?</b>"
  };

  // 3 Actually send the email
  await transpoter.sendMail(mailOptions);
};

module.exports = sendEmail;
