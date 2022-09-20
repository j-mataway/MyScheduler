const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  locationNumber: {
    type: Number,
    required: true,
  },
  admin: [{
    type: String,
  }],
  managers: [{
    type: String,
  }],
  crew: [{
    type: String,
  }],
});

module.exports = mongoose.model("Location", LocationSchema);