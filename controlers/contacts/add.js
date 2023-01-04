const { Contacts } = require('../../models');
const { Conflict } = require('http-errors');

const add = async (req, res, next) => {
  const { _id } = req.user;
  const { name } = req.body;
  const existingUser = await Contacts.findOne({ owner: _id, name });

  if (existingUser) {
    throw new Conflict(`Contact with name ${name} exist`);
  }
  const result = await Contacts.create({
    ...req.body,
    owner: _id,
  });
  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
    message: 'Contact added',
  });
};

module.exports = add;
