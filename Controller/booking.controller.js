const bookings = require("../Model/bookingModel");
const {CreateBooking } = require("../Services/booking.service");
exports.postBooking = async (req, res, next) => {
    try {
      console.log('controller',req.body);
      const booking=new bookings(req.body)
      console.log('Booking',booking);
      const bookingCreate=await CreateBooking(booking)
      if (bookingCreate) {
        res.status(200).json({
          status: "Success",
          message: "User Inserted",
          data: bookingCreate,
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