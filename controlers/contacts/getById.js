const { Contacts } = require('../../models');
const createError = require('http-errors');

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contacts.findOne({
    _id: contactId,
    owner: _id,
  }).populate('owner', 'email subscription');

  if (!result) {
    throw new createError.NotFound(`Contact with id=${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = getById;
