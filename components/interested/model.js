const mongoose = require('mongoose');

const { Schema } = mongoose;

const interestedSchema = Schema({
  offerer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  property: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'properties',
  },
  applicant: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  isDisable: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Interested = mongoose.model('interested', interestedSchema);

module.exports = Interested;
