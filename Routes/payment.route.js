const express = require("express");
const router = express.Router();
const paymentController=require('../Controller/payment.controller');
const { verifyJWT } = require("../Utils/JWT");
router.route("/create-payment-intent").post(verifyJWT,paymentController.getPaymentIntent)
router.route("/payment").post(verifyJWT,paymentController.confirmPayment)
module.exports = router;