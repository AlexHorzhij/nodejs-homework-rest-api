const { Users } = require('../../models');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { sendEmail } = require('../../servises');
const { nanoid } = require('nanoid');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const avatarURL = gravatar.url(email, { s: '250' });
  const user = await Users.findOne({ email });

  if (user) {
    throw createError.Conflict(`User with email ${email} exist`);
  }
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid();

  const data = {
    to: email,
    subject: 'Email verify',
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Follow this link for verify your email</a>`,
  };
  await sendEmail(data);
  const result = await Users.create({
    email,
    password: hashedPassword,
    subscription,
    avatarURL,
    verificationToken,
    verify: false,
  });

  res.status(201).json({
    status: '201 Created',
    data: {
      user: {
        email: result.email,
        id: result._id,
        subscription: result.subscription,
        avatarURL: result.avatarURL,
      },
    },
  });
};

module.exports = register;
