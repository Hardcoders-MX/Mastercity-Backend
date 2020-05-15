const mongoose = require('mongoose');

const { Schema } = mongoose;

const apiKeySchema = new Schema({
  token: {
    type: String,
    default: true,
  },
  scopes: {
    type: Array,
    default: true,
  },
}, {
  versionKey: false,
}, {
  timestamps: true,
});

const ApiKeys = mongoose.model('api-keys', apiKeySchema);

module.exports = ApiKeys;
