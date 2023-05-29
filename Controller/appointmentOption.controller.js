const allappointmentOptions = require("../Model/AppointmentOptionModel");
const {
  appointmentOptions,
  appointmentOptionsSpeciality,
  InsertDoctorAfterVerification,
} = require("../Services/appointment.service");
exports.getAllappointmentOptions = async (req, res, next) => { 
  try {
    const data = await appointmentOptions();
    if (data) {
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
exports.getSpeciality = async (req, res, next) => {
  try {
    const data = await appointmentOptionsSpeciality();
   
    if (data?.length > 0) {
      res.status(200).json({
        status: "Success",
        message: "All Appointment Found",
        data: [...data],
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No Speciality Found",
      data: err?.message,
    });
    next(err);
  }
};
exports.insertDoctor = async (data) => {
  try {
  
    InsertDoctorAfterVerification(data)
  } catch (err) {}
};
