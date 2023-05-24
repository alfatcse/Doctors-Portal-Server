const express = require("express");
const router = express.Router();
const userController = require("../Controller/user.controller");
router
  .route("/users")
  .get(userController.getAllusers)
  .post(userController.createUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/usersrole").get(userController.getUserRole);
router.route("/user").get(userController.getSingleUser)
module.exports = router;
 