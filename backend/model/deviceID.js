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
<<<<<<< HEAD

}, { timestamps: true, versionKey: false });
=======
},{ timestamps: true, versionKey: false });

>>>>>>> a61cdf56fdd6b61b081baed1d05bda72c5130246

module.exports = mongoose.model("device", deviceSchema);
