const mongoose = require('mongoose')

//import timeThai
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok")

const dataSchema = mongoose.Schema({
  _data: {
    type: String,
    required: true
  },
  date: {
    type: Date, 
    default: dateThailand
  }
});


module.exports = mongoose.model("_data", dataSchema);
