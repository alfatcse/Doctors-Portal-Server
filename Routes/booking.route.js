const express = require("express");
const router = express.Router();
const bookingController = require("../Controller/booking.controller");
router
  .route("/bookings")
  .post(bookingController.postBooking)
  .get(bookingController.getBooking);
module.exports = router;
