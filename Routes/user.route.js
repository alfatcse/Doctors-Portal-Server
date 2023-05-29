const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");
const {verifyJWT}  = require("../Utils/JWT");
router
  .route("/users")
  .get(verifyJWT,userController.getAllusers)
  .post(userController.createUser)
  .patch(verifyJWT,userController.updateUser)
  .delete(verifyJWT,userController.deleteUser);
router.route("/usersrole").get(verifyJWT,userController.getUserRole);
router.route("/user").get(verifyJWT,userController.getSingleUser)
module.exports = router;
 