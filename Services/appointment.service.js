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
exports.InsertDoctorAfterVerification = async (data) => {
   
  const q = {
    name: data?.specialty,
  };
  const options = { new: true, useFindAndModify: false };
  const doc = {
    $push: {
      doctors: {
        name: data?.name,
        docEmail: data?.email,
        doctorId: data?._id,
      },
    }, 
  };
  const r = await appointmentOptions.updateOne(q,doc,options);
};
