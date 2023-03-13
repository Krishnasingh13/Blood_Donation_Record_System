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
});

module.exports = mongoose.model("bloodBank", bloodBankSchema);
