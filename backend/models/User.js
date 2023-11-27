const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    hostedEvents: {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    },
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }]
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);
