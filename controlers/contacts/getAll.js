const { Contacts } = require('../../models/schema');

const getAll = async (req, res, next) => {
  const result = await Contacts.find({});

  res.json({
    status: 'success',
    code: 200,
    data: result,
  });
};

module.exports = getAll;
