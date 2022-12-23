const createError = require('http-errors');
const { Contacts } = require('../../models');

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    throw new createError.BadRequest('missing field favorite');
  }
  const updadedContact = await Contacts.findByIdAndUpdate(
    contactId,
    {
      favorite,
    },
    { new: true }
  );

  if (!updadedContact) {
    throw new createError.NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: updadedContact,
    message: 'Contact updaded',
  });
};

module.exports = updateStatusContact;
