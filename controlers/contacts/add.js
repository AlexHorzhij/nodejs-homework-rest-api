const { Contacts } = require('../../models/schema');

const add = async (req, res, next) => {
  const { _id } = req.user;

  const result = await Contacts.create({ ...req.body, owner: _id });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
    message: 'Contact added',
  });
};

module.exports = add;
