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
    patient_id: {
      type: String,
      required: [true, "Please provide a id"],
      unique: true,
    },
    patient_email: {
      type: String,
      required: true,
      max: 50,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    patient_Phone: { type: Number, required: true },
    appointmentData: [
      {
        doctor_email: String,
        treatment: String,
        price: Number,
        AppointmentDate: String,
        slot: String,
        isPaid: Boolean,
      },
    ],
  },
  { versionKey: false }
);
module.exports = mongoose.model("bookings", bookingSchema, "bookings");
