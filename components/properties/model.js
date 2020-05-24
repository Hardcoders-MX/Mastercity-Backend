const mongoose = require('mongoose');
const addressSchema = require('../addresses/model');

const { Schema } = mongoose;

const locationSchema = new Schema({
  lat: {
    type: Number,
    required: true,
  },
  len: {
    type: Number,
    required: true,
  },
});

const mediaFileSchema = new Schema({
  secure_url: {
    type: String,
    default: '',
  },
  resource_type: {
    type: String,
    default: '',
  },
  format: {
    type: String,
    default: '',
  },
});

const propertySchema = new Schema({
  offerer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  address: {
    type: addressSchema,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  mediaFiles: {
    type: [mediaFileSchema],
    required: true,
  },
  propertyType: {
    type: String,
    enum: ['house', 'department', 'office', 'studio'],
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
  squareMeters: {
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
  isDisabled: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true,
});

const Property = mongoose.model('properties', propertySchema);

module.exports = Property;
