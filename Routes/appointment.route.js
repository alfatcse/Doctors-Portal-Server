const express=require("express");
const router=express.Router();
const appointmentOptionsController=require('../Controller/appointmentOption.controller')
router.route('/appointmentOptions').get(appointmentOptionsController.getAllappointmentOptions);
router.route('/appointmentSpecialty').get(appointmentOptionsController.getSpeciality)
module.exports=router