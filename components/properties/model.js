const mongoose = require('mongoose');

const { Schema } = mongoose;

const propertySchema = new Schema({
  propertyType: {
    type: String,
    enum: ['house', 'department', 'office', 'studio'],
  },
  location: {
    lat: Number,
    len: Number,
  },
  price: {
    type: Number,
    require: true,
  },
  rooms: {
    type: Number,
    require: true,
  },
  bathrooms: {
    type: Number,
    require: true,
  },
  square_meters: {
    type: Number,
    require: true,
  },
  priceMeters: {
    type: Number,
    required: true,
  },
  furnish: {
    type: Boolean,
    require: true,
  },
  parking: {
    type: Boolean,
    require: true,
  },
  swimmingPool: {
    type: Boolean,
    required: true,
  },
  heating: {
    type: Boolean,
    required: true,
  },
  security: {
    type: Boolean,
    required: true,
  },
  cellar: {
    type: Boolean,
    required: true,
  },
  elevator: {
    type: Boolean,
    required: true,
  },
  isApprove: {
    type: Boolean,
    required: true,
  },
  isDisable: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

const Property = mongoose.model('properties', propertySchema);

module.exports = Property;
