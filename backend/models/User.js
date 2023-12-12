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
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    hostedEvents: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    requestedEvents: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    age: {
      type: Number
    }
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema);
