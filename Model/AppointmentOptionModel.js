const mongoose = require("mongoose");
const validator = require("validator");
const appointmentOptions = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Service Name"], 
  },
  price: {
    type: Number,
    required: true,
  },
  slots: Array,
  doctors: [
    {
      name: {
        type: String,
        required: [true, "Please Provide a Service Name"],
        lowercase: true,
        trim: true,
      },
      docEmail: {
        type: String,
        required: true,
        unique: true,
        max: 50,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
      },
      doctorId:{
        type:String
      }
    },
  ],
},{ versionKey: false });
module.exports=mongoose.model("appointmentOptions",appointmentOptions,"appointmentOptions");
