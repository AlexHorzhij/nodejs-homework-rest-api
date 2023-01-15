const { Contacts } = require('../../models');

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;
  const findParam = { owner: _id };

  if (favorite !== undefined) {
    findParam.favorite = favorite;
  }

  const result = await Contacts.find(findParam, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'email subscription');

  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = getAll;
