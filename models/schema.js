const { Schema, model } = require('mongoose');

const mongoosSchema = new Schema({
  name: { type: String, required: [true, 'Set name for contact'] },
  email: { type: String },
  phone: { type: String },
  favorite: { type: Boolean, default: false },
});

const Contacts = model('contact', mongoosSchema);

//    -----Joi Schema-----

// const contact = {
//   name: Joi.string(),
//   email: Joi.string().email(),
//   phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
//   favorite: Joi.boolean(),
// };

// const contactsAddSchema = Joi.object({
//   name: contact.name.required(),
//   email: contact.email.required(),
//   phone: contact.phone.required(),
//   favorite: contact.favorite,
// });

// const contactsUpdateSchema = Joi.object({
//   name: contact.name.optional(),
//   email: contact.email.optional(),
//   phone: contact.phone.optional(),
//   favorite: contact.favorite,
// });

module.exports = {
  Contacts,
};
