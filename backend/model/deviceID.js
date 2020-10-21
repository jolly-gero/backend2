const mongoose = require('mongoose')

const deviceSchema = mongoose.Schema({
  user_ID: {
    type: String,
    required: true
  },
  device_ID: {
    type: String,
    required: true
  },
  device_status: {
    type: String,
    required: true
  },
  device_key: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("device", deviceSchema);