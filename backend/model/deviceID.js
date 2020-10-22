const mongoose = require('mongoose')

const deviceSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  device_name: {
    type: String,
    required: true
  },
  client_id: {
    type: String,
    required: true
  },
  device_id: {
    type: String,
    required: true
  },
  device_password: {
    type: String,
    required: true
  }
},{ timestamps: true, versionKey: false });

module.exports = mongoose.model("device", deviceSchema);
