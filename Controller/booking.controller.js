const bookings = require("../Model/bookingModel");
const { CreateBooking, CheckBooking } = require("../Services/booking.service");
exports.postBooking = async (req, res, next) => {
  try {
    console.log("Booking controller", req.body);
    const bookingBody = req.body;
    const query = {
      AppointmentDate: bookingBody?.AppointmentDate,
      treatment: bookingBody?.treatment,
      email: bookingBody?.patient_email,
    };
    const alreadyBooked = await CheckBooking(query);
    console.log("book or not", alreadyBooked);
    if (alreadyBooked === false) {
      const booking = new bookings(req.body);
      const bookingCreate = await CreateBooking(booking);
      if (bookingCreate) {
        res.status(200).json({
          status: "Success",
          message: "Booking Inserted",
          data: bookingCreate,
        });
      }
    } else if (alreadyBooked === true) {
      const message = `You have already a booking on ${bookingBody?.AppointmentDate}`;
      res.status(400).json({
        status: "Failed",
        message: message,
      });
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
