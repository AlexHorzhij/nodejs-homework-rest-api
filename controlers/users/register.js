const { Users } = require('../../models/schema');
const createError = require('http-errors');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await Users.findOne({ email });
  if (user) {
    throw createError.Conflict(`User with email ${email} exist`);
  }
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const result = await Users.create({
    email,
    password: hashedPassword,
    subscription,
  });

  res.status(201).json({
    status: '201 Created',
    data: {
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    },
  });
};

module.exports = register;
