const { Users } = require('../../models');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ email });
  const checkPassword = bcryptjs.compareSync(password, user.password);

  if (!user || !checkPassword) {
    throw createError.Unauthorized('Wrong password or email, try again');
  }

  const { SECRET_KEY } = process.env;
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await Users.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    status: '200 OK',
    data: {
      token: token,
      user: {
        email: email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
