const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  bloodBank: {
    type: Object,
  },
  donor: {
    type: Object,
  },
  date: { type: Number, default: Date.now() },

  certificate: {
    type: Object,
  },
  
  certificateGenerated: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("donation", donationSchema);
