const schemaVlidation = require('./schemaVlidation');
const controlerWrapper = require('./controlerWrapper');
const auth = require('./auth');
const upload = require('./multer');
const { registerSchema, updateSchema } = require('./usersSchemaJoi');
const {
  contactsAddSchema,
  contactsUpdateSchema,
} = require('./contactsSchemaJoi');

module.exports = {
  schemaVlidation,
  controlerWrapper,
  auth,
  upload,
  contactsAddSchema,
  contactsUpdateSchema,
  registerSchema,
  updateSchema,
};
