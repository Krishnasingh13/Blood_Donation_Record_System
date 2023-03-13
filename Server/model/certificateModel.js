const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certificateDate: {
    type: Date,
    default: Date.now,
  },
  certificateName: {
    type: String,
    require: true,
  },
  data: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("certificate", certificateSchema);
