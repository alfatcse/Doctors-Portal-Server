const express=require("express");
const router=express.Router();
const slotController=require('../Controller/slot.controller')
router.route('/slot/:email').get(slotController.getSlot);
router.route('/slot').patch(slotController.updateSlot)
module.exports=router