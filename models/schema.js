const { Schema, model } = require('mongoose');

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    unique: true,
  },
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  favorite: { type: Boolean, default: false },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Contacts = model('contact', contactsSchema);

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  token: String,
});

const Users = model('user', userSchema);

module.exports = {
  Contacts,
  Users,
};
