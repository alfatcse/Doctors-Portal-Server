const express = require("express");
const router = express.Router();
const bookingController = require("../Controller/booking.controller");
const { verifyJWT } = require("../Utils/JWT");
router
  .route("/bookings")
  .post(bookingController.postBooking)
  .get(bookingController.getBooking);
router.route("/booking/:id").get(verifyJWT, bookingController.getSingleBooking);
router.route("/booking-doctor").get(bookingController.getAllBooingDoctor);
module.exports = router;
