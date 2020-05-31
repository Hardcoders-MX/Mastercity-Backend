const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  property: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'properties',
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Favorite = mongoose.model('favorites', favoriteSchema);

module.exports = Favorite;
