const User = require("../Model/UserModel");
const { allUsers,createUser } = require("../Services/user.service");
exports.getAllusers = async (req, res, next) => {
  try {
    const allusers = await allUsers();
    if (allusers) {
      res.status(200).json({
        status: "Success",
        message: "All Users Found",
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
      const user=new User(req.body);
      const userCreate=await createUser(user);
      if(userCreate){
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
