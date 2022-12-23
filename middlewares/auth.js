const { Users } = require('../models');
const { Unauthorized } = require('http-errors');
const jws = require('jsonwebtoken');

const auth = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  try {
    if (!token || bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized');
    }

    const { id } = jws.verify(token, SECRET_KEY);
    const user = await Users.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized('Not authorized');
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === 'invalid signature') {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
