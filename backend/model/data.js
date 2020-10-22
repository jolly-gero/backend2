const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
  _data: {
    type: String,
    required: true
  }
},{ timestamps: true, versionKey: false });

module.exports = mongoose.model("_data", dataSchema);
