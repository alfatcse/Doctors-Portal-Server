const bookings = require("../Model/bookingModel");
const {
  CreateBooking,
  CheckBooking,
  CheckPatient,
  InsertAppointment,
  GetBooking,
  get_single_booking,
  getPatients,
} = require("../Services/booking.service");
const { sendBookingEmail } = require("../Utils/SendConfirmationEmail");
exports.postBooking = async (req, res, next) => {
  console.log("booking", req.body);
  try {
    const patient = await CheckPatient(req.body.patient_id);
    if (patient === false) {
      const booking = new bookings({
        patient_name: req.body.patient_name,
        patient_id: req.body.patient_id,
        patient_email: req.body.patient_email,
        patient_Phone: req.body.patient_Phone,
        appointmentData: [
          {
            doctor_email: req.body.doctor_email,
            treatment: req.body.treatment,
            price: req.body.price,
            AppointmentDate: req.body.AppointmentDate,
            slot: req.body.slot,
            isPaid: req.body.isPaid,
          },
        ],
      });
      const bookingCreate = await CreateBooking(booking);
      if (bookingCreate) {
        const booking = {
          patient_email: req.body.patient_email,
          slot: req.body.slot,
          treatment: req.body.treatment,
          AppointmentDate: req.body.AppointmentDate,
        };
        const c = await sendBookingEmail(booking);
        if (c === true) {
          res.status(200).json({
            status: "Success",
            message:
              "Booing Confirmed.Please Check Your Email for confirmation",
          });
        } else if (c === false) {
          res.status(200).json({
            status: "Success",
            message: "Booing Confirmed.",
          });
        }
      }
    } else if (patient === true) {
      const appointmentData = {
        patient_id: req.body.patient_id,
        doctor_email: req.body.doctor_email,
        treatment: req.body.treatment,
        price: req.body.price,
        AppointmentDate: req.body.AppointmentDate,
        slot: req.body.slot,
        isPaid: req.body.isPaid,
      };
      const hasBooing = await CheckBooking(appointmentData);
      if (hasBooing === true) {
        const message = `You have already a booking on ${req.body.AppointmentDate}`;
        res.status(400).json({
          status: "Failed",
          message: message,
        });
      } else if (hasBooing === false) {
        const newBooing = await InsertAppointment(appointmentData);
        if (newBooing) {
          const booking = {
            patient_email: req.body.patient_email,
            slot: req.body.slot,
            treatment: req.body.treatment,
            AppointmentDate: req.body.AppointmentDate,
          };
          const c = await sendBookingEmail(booking);
          if (c === true) {
            res.status(200).json({
              status: "Success",
              message:
                "Booing Confirmed.Please Check Your Email for confirmation",
            });
          } else if (c === false) {
            res.status(200).json({
              status: "Success",
              message: "Booing Confirmed",
            });
          }
        }
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "Booking not Inserted",
      data: err?.message,
    });
    next(err);
  }
};
exports.getBooking = async (req, res, next) => {
  try {
    const email = req.query.email;
    const booking = await GetBooking(email);
    if (booking?.patient_name) {
      res.status(200).json({
        status: "Success",
        message: "Bookings Found.",
        data: booking,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "No Bookings Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "An Error Occurred",
      data: err?.message,
    });
    next(err);
  }
};
exports.getSingleBooking = async (req, res, next) => {
  try {
    const b = await get_single_booking(req.params.id);
    if (b?.appointmentData) {
      res.status(200).json({
        status: "Success",
        message: "Bookings Found.",
        data: b?.appointmentData,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "No data found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "An Error Occurred",
      data: err?.message,
    });
    next(err);
  }
};
exports.getAllBooingDoctor = async (req, res, next) => {
  console.log(req.query.email);
  try {
    const allPatients = await getPatients(req.query.email);
    if (allPatients.length > 0) {
      res.status(200).json({
        status: "Success",
        message: "Data found",
        data: allPatients,
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: "Data found",
        data: allPatients,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "An Error Occurred",
      data: err?.message,
    });
    next(err);
  }
};
