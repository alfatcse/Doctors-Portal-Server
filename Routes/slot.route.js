const express=require("express");
const router=express.Router();
const slotController=require('../Controller/slot.controller')
router.route('/docemailslot/:email').get(slotController.getSlot);
module.exports=router