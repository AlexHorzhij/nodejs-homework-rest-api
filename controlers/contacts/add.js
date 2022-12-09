const { Contacts } = require('../../models/schema');

const add = async (req, res, next) => {
  console.log(req.body);
  const result = await Contacts.create(req.body);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: result,
    message: 'Contact added',
  });
};

module.exports = add;
