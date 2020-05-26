const mongoose = require('mongoose');

const { Schema } = mongoose;

const addressSchema = new Schema({
  country: {
    type: String,
    default: 'México',
  },
  state: {
    type: String,
    required: true,
  },
  townHall: {
    type: String,
    required: true,
  },
  colony: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  outdoorNumber: {
    type: String,
    required: true,
  },
  interiorNumber: {
    type: String,
    default: '',
  },
});

module.exports = addressSchema;
