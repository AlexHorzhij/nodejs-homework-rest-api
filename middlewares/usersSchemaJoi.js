const Joi = require('joi');

const users = {
  email: Joi.string().email(),
  password: Joi.string().min(6),
  subscription: Joi.string(),
  avatarURL: Joi.string(),
};

const registerSchema = Joi.object({
  email: users.email.required(),
  password: users.password.required(),
  subscription: users.subscription.optional(),
  avatarURL: users.avatarURL.optional(),
});

const updateSchema = Joi.object({
  email: users.email.optional(),
  password: users.password.optional(),
  subscription: users.subscription.valid('starter', 'pro', 'business').optional(),
  avatarURL: users.avatarURL.optional(),
});

module.exports = {
  registerSchema,
  updateSchema,
};
