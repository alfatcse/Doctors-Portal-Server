const express=require("express");
const router=express.Router();
const userCollection=require('../Controller/user.controller')
router.route('/users').get(userCollection.getAllusers).post(userCollection.createUser).patch(userCollection.updateUser);
router.route('/usersrole').get(userCollection.getUserRole);
module.exports=router