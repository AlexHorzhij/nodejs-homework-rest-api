const { Users } = require('../../models');
const { NotFound } = require('http-errors');

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });
  if (!user) {
    throw NotFound('User not found');
  }
  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({
    status: '200 OK',
    message: 'Verification successful',
  });
};

module.exports = verifyEmail;
