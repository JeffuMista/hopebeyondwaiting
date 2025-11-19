const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  start: Date,
  end: Date,
  capacity: Number,
  booked: { type: Number, default: 0 }
});

const centerSchema = new mongoose.Schema({
  name: {type: String, required: true},
  county: {type: String, required: true},
  address: {type: String, required: true},
  capacity: {type: Number, required: true},
  slots: [slotSchema]
}, { timestamps: true });

const Center = mongoose.model('CancerCenter', centerSchema);

module.exports = Center;
