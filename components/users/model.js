const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
  firstName: {
    type: String,
    default: false,
  },
  lastName: {
    type: String,
    default: false,
  },
  email: {
    type: String,
    default: true,
  },
  password: {
    type: String,
    default: true,
  },
  type: {
    type: String,
    default: true,
  },
  
},
{ versionKey: false});

const model = mongoose.model('user', mySchema);

module.exports = model;
