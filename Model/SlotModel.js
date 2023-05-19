const mongoose = require("mongoose");
const validator = require("validator");
const SlotSchema = mongoose.Schema(
  {
    docEmail: {
      type: String,
      required: [true, "Please Provide Doctor Email"],
      lowercase: true,
      trim: true, 
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    docSlot: [
      {
        date: String,
        slot: Array,
      },
    ],
  },
  {
    versionKey: false,
  }
);
module.exports = mongoose.model("slot", SlotSchema, "slot");
