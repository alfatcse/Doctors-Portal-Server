const mongoose = require("mongoose");
const validator = require("validator");
const paymentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: false,
    },
    price: {
      type: Number,
      required: true,
    },
    transactionid: {
      type: String,
      required: true,
      unique: true,
    },
    bookingID: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("payment", paymentSchema, "payment");
