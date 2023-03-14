const mongoose = require("mongoose");

const bloodBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  place: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlenght: 8,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  donation: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "donation",
    },
  ],
  stats: {
    type: {
      bloodBankId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      today: {
        type: Number,
        required: true,
        default: 0,
      },
      week: {
        type: Number,
        required: true,
        default: 0,
      },
      month: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    default: {
      bloodBankId: null,
      today: 0,
      week: 0,
      month: 0,
    },
  },
});

module.exports = mongoose.model("bloodBank", bloodBankSchema);
