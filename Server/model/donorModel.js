const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
    minlength: 12,
    maxlength: 12,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
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

module.exports = mongoose.model("user", userSchema);
