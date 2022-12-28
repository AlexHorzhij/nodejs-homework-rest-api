const schemaVlidation = require('./schemaVlidation');
const controlerWrapper = require('./controlerWrapper');
const auth = require('./auth');
const {
  contactsAddSchema,
  contactsUpdateSchema,
} = require('./contactsSchemaJoi');
const { registerSchema, updateSchema } = require('./usersSchemaJoi');

module.exports = {
  schemaVlidation,
  controlerWrapper,
  auth,
  contactsAddSchema,
  contactsUpdateSchema,
  registerSchema,
  updateSchema,
};
