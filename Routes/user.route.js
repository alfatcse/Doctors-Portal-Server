const express=require("express");
const router=express.Router();
const userCollection=require('../Controller/user.controller')
router.route('/users').get(userCollection.getAllusers);
router.route('/users').post(userCollection.createUser);
module.exports=router