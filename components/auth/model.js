const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
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
  isRealEstate: {
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
