const register = require('./register');
const login = require('./login');
const current = require('./current');
const logout = require('./logout');
const updateSubscription = require('../users/updateDiscription');

module.exports = {
  register,
  login,
  current,
  logout,
  updateSubscription,
};
