const mongoose = require("mongoose");
const validator = require("validator");
const bookingSchema = new mongoose.Schema(
  {
    patient_name: {
      type: String,
      required: [true, "Please provide a name"],
      min: [3, "Name must be three characters at least"],
      max: [20, "Name must be lower than twenty characters"],
      lowercase: true, 
      trim: true,
    },
    slot: {
      type: String,
      required: [true, "Please provide a name"],
    },
    AppointmentDate: {
      type: String,
    },
    patient_email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    patient_Phone: { type: Number, required: true },
    price: { type: Number },
    doctor_email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    treatment: {
      type: String,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("bookings", bookingSchema, "bookings");
