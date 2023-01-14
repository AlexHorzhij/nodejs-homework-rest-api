const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { BASE_URL } = process.env;
const EMAIL = 'denas3000@gmail.com';

const sendEmail = async (email, verificationToken) => {
  const data = {
    from: EMAIL,
    to: email,
    subject: 'Email verify',
    html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}">Follow this link for verify your email</a>`,
  };

  try {
    await sgMail.send(data);
    console.log('Email sended');
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = sendEmail;
