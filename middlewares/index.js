const schemaVlidation = require('./schemaVlidation');
const controlerWrapper = require('./controlerWrapper');
const auth = require('./auth');
const {
  contactsAddSchema,
  contactsUpdateSchema,
  registerSchema,
  updateSchema,
} = require('./schemaJoi');

module.exports = {
  schemaVlidation,
  controlerWrapper,
  auth,
  contactsAddSchema,
  contactsUpdateSchema,
  registerSchema,
  updateSchema,
};
