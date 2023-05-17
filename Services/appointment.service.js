const appointmentOptions = require("../Model/AppointmentOptionModel");
exports.appointmentOptions = async () => {
  const query = {};
  const data = await appointmentOptions.find(query);
  if (data?.length > 0) {
    return data;
  }
};
exports.appointmentOptionsSpeciality = async () => {
  const data = await appointmentOptions.find({}).select("name");
  if (data?.length > 0) {
    return data;
  }
};
