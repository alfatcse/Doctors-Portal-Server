const express=require("express");
const router=express.Router();
const appointmentOptionsController=require('../Controller/appointmentOption.controller')
router.route('/appointmentOptions').get(appointmentOptionsController.getAllappointmentOptions);
module.exports=router