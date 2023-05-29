const User = require("../Model/UserModel");
const {
  allUsers,
  createUser,
  getRole,
  updateUserRole,
  deleteuser,
  getSingleuser,
} = require("../Services/user.service");
const { insertDoctor } = require("./appointmentOption.controller");
exports.getAllusers = async (req, res, next) => {
  try {
    const allusers = await allUsers(req.query.userType);
    if (allusers) {
      res.status(200).json({
        status: "Success",
        message: `All ${req.query.userType} Found`,
        data: [...allusers],
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No User Found",
      data: err?.message,
    });
    next(err);
  }
};
exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const userCreate = await createUser(user);
    if (userCreate) {
      res.status(200).json({
        status: "Success",
        message: "User Inserted",
        data: userCreate,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "User not Inserted",
      data: err?.message,
    });
    next(err);
  }
};
exports.getUserRole = async (req, res, next) => {
  try {
    const getrole = await getRole(req.query.email);
    if (getrole === "Doctor" || getrole === "Patient" || getrole === "admin") {
      res.status(200).json({
        status: "Success",
        message: "All Users Found",
        data: getrole,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "No User Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No User Found",
      data: err?.message,
    });
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const update = await updateUserRole(req.query.id);
    if (update) {
      insertDoctor(update);
      res.status(200).json({
        status: "Success",
        message: "Updated Successfully",
      });
    } else if (update === false) {
      res.status(400).json({
        status: "Failed",
        message: "No User Found",
        data: err?.message,
      });
      next(err);
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No User Found",
      data: err?.message,
    });
    next(err);
  }
};
exports.deleteUser = async (req, res, next) => {
  try {
    const deleteUser = await deleteuser(req.query.id);
    console.log(deleteUser);
    if (deleteUser.deletedCount === 1) {
      res.status(200).json({
        status: "Success",
        message: "Deleted Successfully",
        data:deleteUser
      });
    } else {
      res.status(400).json({
        status: "Success",
        message: "Deleted Failed",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No User Found",
      data: err?.message,
    });
    next(err);
  }
};
exports.getSingleUser = async (req, res, next) => {
  try {
   
    const SingleUser = await getSingleuser(req.query.userEmail);

    if (SingleUser !== false) {
      res.status(200).json({
        status: "Success",
        message: `User Found`,
        data: SingleUser,
      });
    } else {
      res.status(400).json({
        status: "Failed",
        message: "No User Found",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "Failed",
      message: "No User Found",
      data: err?.message,
    });
    next(err);
  }
};
