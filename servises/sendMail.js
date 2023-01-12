const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KE);

const sendEmail = async data => {
  try {
    await sgMail.send({ ...data, from: 'denas3000@gmail.com' });
    console.log('Email sended');
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = sendEmail;
