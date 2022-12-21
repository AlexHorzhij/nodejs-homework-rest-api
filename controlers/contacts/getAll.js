const { Contacts } = require('../../models/schema');

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page, limit, favorite } = req.query;
  const result = await Contacts.find({ owner: _id });

  let resultPagination = result;
  if (page !== undefined || limit !== undefined) {
    resultPagination = result.filter(
      (_, index) => index >= (page - 1) * limit && index <= page * limit - 1
    );
  }

  if (favorite !== undefined) {
    resultPagination = resultPagination.filter(
      item => String(item.favorite) === String(favorite)
    );
  }

  res.json({
    status: 'success',
    code: 200,
    data: resultPagination,
  });
};

module.exports = getAll;
