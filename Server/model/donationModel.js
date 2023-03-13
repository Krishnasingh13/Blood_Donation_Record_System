const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  bloodBank: {
    type: Object,
  },
  donor: {
    type: Object,
  },

  bloodBankId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bloodBank",
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
