const User = require("../Model/UserModel");
const { allUsers, createUser, getRole, updateUserRole } = require("../Services/user.service");
exports.getAllusers = async (req, res, next) => {
  try {
    const allusers = await allUsers(req.query.userType);
    if (allusers?.length>0) {
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
    console.log(req.body);
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
exports.updateUser=async(req,res,next)=>{
  try{
    console.log(req.query.id);
    const update=await updateUserRole(req.query.id);
  }catch(err){
    res.status(400).json({
      status: "Failed",
      message: "No User Found",
      data: err?.message,
    });
    next(err);
  }
}

