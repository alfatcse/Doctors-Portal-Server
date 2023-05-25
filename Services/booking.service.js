const { ObjectId } = require("mongodb");
const Booking = require("../Model/bookingModel");
exports.CreateBooking = async (data) => {
  const booking = await Booking.create(data);
  if (booking) {
    return booking;
  }
};
exports.CheckBooking = async (data) => {
  const patient = await Booking.findOne({ patient_id: data.patient_id });
  let hasBooing = false;
  patient?.appointmentData.map((a) => {
    if (
      a?.doctor_email === data?.doctor_email &&
      a?.treatment === data?.treatment &&
      a?.AppointmentDate === data?.AppointmentDate
    ) {
      hasBooing = true;
    }
  });
  return hasBooing;
};
exports.InsertAppointment = async (data) => {
  const patient = await Booking.findOne({ patient_id: data.patient_id });
  const a = {
    doctor_email: data.doctor_email,
    treatment: data.treatment,
    price: data.price,
    AppointmentDate: data.AppointmentDate,
    slot: data.slot,
  };
  patient?.appointmentData.push(a);
  const updateDoc = {
    $set: {
      appointmentData: patient.appointmentData,
    },
  };
  const updateAppointment = await Booking.findOneAndUpdate(
    { patient_id: data.patient_id },
    updateDoc
  );
  return updateAppointment;
};
exports.CheckPatient = async (data) => {
  const patient = await Booking.findOne({ patient_id: data });
  if (patient?._id) {
    return true;
  } else {
    return false;
  }
};
exports.GetBooking = async (data) => {
  const booking = await Booking.findOne({ patient_email: data });
  if (booking?.patient_name) {
    return booking;
  }
};
exports.get_single_booking = async (data) => {
  const b = await Booking.aggregate([
    {
      $match: {
        "appointmentData._id": ObjectId(data),
      },
    },
    {
      $project: {
        appointmentData: {
          $filter: {
            input: "$appointmentData",
            cond: {
              $eq: ["$$this._id", ObjectId(data)],
            },
          },
        },
      },
    },
    {
      $unwind: "$appointmentData",
    },
  ]);
  
  return b[0];
};
