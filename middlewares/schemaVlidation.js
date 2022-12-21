const createError = require('http-errors');

const schemaVlidation = schema => {
  return (req, res, next) => {
    const newData = req.body;

    const { error } = schema.validate(newData);

    if (error) {
      throw new createError.BadRequest(error.message);
    }
    next();
  };
};

module.exports = schemaVlidation;
