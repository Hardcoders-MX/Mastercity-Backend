const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    default: true,
  },
  lastName: {
    type: String,
    default: true,
  },
  email: {
    type: String,
    default: true,
  },
  password: {
    type: String,
    default: true,
  },
  profileType: {
    type: String,
    default: true,
    enum: ['admin', 'offerer', 'applicant'],
  },
  isDisable: {
    type: Boolean,
    required: true,
  },
}, {
  versionKey: false,
}, {
  timestamps: true,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
