const mongoose = require('mongoose')

//import timeThai
const moment = require('moment-timezone');
const dateThailand = moment.tz(Date.now(), "Asia/Bangkok");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile:{
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    mobilephone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    }
  },
  date: {
    type: Date,
    default: dateThailand
  },
},{ timestamps: true, versionKey: false });

module.exports = mongoose.model("login", userSchema);
