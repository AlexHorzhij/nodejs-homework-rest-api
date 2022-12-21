const createError = require('http-errors');
const { Users } = require('../../models/schema');

const updateSubscription = async (req, res, next) => {
  const { userId } = req.params;
  const { subscription } = req.body;

  if (subscription === undefined) {
    throw new createError.BadRequest('missing field subscription');
  }
  const updadedUser = await Users.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );

  if (!updadedUser) {
    throw new createError.NotFound(`Contact with id=${userId} not found`);
  }
  const result = {
    email: updadedUser.email,
    subscription: updadedUser.subscription,
  };

  res.json({
    status: 'success',
    code: 200,
    data: result,
    message: 'Contact updaded',
  });
};

module.exports = updateSubscription;
