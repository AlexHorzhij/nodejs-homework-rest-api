const { Users } = require('../../models');
const { BadRequest, NotFound } = require('http-errors');
const { sendEmail } = require('../../servises');

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw BadRequest('missing required field email');
  }
  const user = await Users.findOne({ email });

  if (!user) {
    throw NotFound(`User whith email ${email} not found`);
  }
  if (user.verify) {
    throw BadRequest('Verification has already been passed');
  }

  sendEmail(email, user.verificationToken);

  res.status(200).json({
    status: '200 OK',
    message: 'Verification email sent',
  });
};

module.exports = resendVerifyEmail;
