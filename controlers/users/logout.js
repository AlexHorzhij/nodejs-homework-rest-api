const { Users } = require('../../models');

const logout = async (res, req) => {
  const { _id } = res.user;
  await Users.findByIdAndUpdate(_id, { token: null });
  req.status(204).json();
};

module.exports = logout;
