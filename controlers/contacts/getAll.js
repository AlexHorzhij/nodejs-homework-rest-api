const { Contacts } = require('../../models');

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  let result = await Contacts.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'email subscription');

  if (favorite !== undefined) {
    result = await Contacts.find({ owner: _id, favorite }, '', {
      skip,
      limit: Number(limit),
    }).populate('owner', 'email subscription');
  }

  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = getAll;
