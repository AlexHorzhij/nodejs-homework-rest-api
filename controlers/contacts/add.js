const { Contacts } = require('../../models');
const { Conflict } = require('http-errors');

const add = async (req, res, next) => {
  const { _id } = req.user;
  const { name } = req.body;
  // const { path: tempPath, originalname } = req.file;
  const doubleUser = await Contacts.find({ owner: _id, name });
  console.log('req.file', req.file);

  if (doubleUser.length !== 0) {
    throw new Conflict(`Contact with name ${req.body.name} exist`);
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
