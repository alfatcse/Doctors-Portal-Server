const mongoose = require("mongoose");
const validator = require("validator");
const paymentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    price: {
      type: Number,
      required: true,
    },
    transactionid: {
      type: String,
      required: true,
    },
    bookingID: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("payment", paymentSchema, "payment");
