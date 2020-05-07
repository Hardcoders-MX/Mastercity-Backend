const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertySchema = new Schema({}, {
  timestamps: true,
});

const Property = mongoose.model('properties', propertySchema);

module.exports = Property;
