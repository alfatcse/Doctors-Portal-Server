const allappointmentOptions = require("../Model/AppointmentOptionModel");
const { appointmentOptions } = require("../Services/appointment.service");
exports.getAllappointmentOptions = async (req, res, next) => {
  try {
    const data=await appointmentOptions();
    if(data){
        res.status(200).json({
            status: "Success",
            message: "All Appointment Found",
            data: [...data],
          });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No Appointment Found",
      data: err?.message,
    });
    next(err);
  }
};