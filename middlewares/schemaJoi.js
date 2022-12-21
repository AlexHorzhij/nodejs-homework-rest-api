const Joi = require('joi');

const contact = {
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
  favorite: Joi.boolean(),
};

const contactsAddSchema = Joi.object({
  name: contact.name.required(),
  email: contact.email.required(),
  phone: contact.phone.required(),
  favorite: contact.favorite,
});

const contactsUpdateSchema = Joi.object({
  name: contact.name.optional(),
  email: contact.email.optional(),
  phone: contact.phone.optional(),
  favorite: contact.favorite,
});

const users = {
  email: Joi.string().email(),
  password: Joi.string().min(6),
  subscription: Joi.string(),
};

const registerSchema = Joi.object({
  email: users.email.required(),
  password: users.password.required(),
  subscription: users.subscription,
});

const updateSchema = Joi.object({
  email: users.email.optional(),
  password: users.password.optional(),
  subscription: users.subscription,
});

module.exports = {
  contactsAddSchema,
  contactsUpdateSchema,
  registerSchema,
  updateSchema,
};
