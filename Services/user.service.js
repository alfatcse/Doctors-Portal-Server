const User = require("../Model/UserModel");
exports.allUsers = async (data) => {
  const query = { role: data };
  const users = await User.find(query);
  if (users.length > 0) {
    return users;
  } else {
    return users;
  }
};
exports.createUser = async (data) => {
  const user = await User.create(data);
  return user;
};
exports.getRole = async (data) => {
  const userRole = await User.findOne({ email: data }).select("role");
  if (userRole?.role) {
    return userRole.role;
  }
};
exports.updateUserRole = async (data) => {
  const filter = { _id: data };
  const options = { new: true, useFindAndModify: false };
  const updateDoc = {
    $set: {
      isverified: "verified",
    },
  };
  const updateUser = await User.findOneAndUpdate(filter, updateDoc, options);
  if (updateUser?.isverified === "verified") {
    return updateUser;
  } else {
    return false;
  }
};
exports.deleteuser = async (data) => {
  const deleteUser = await User.deleteOne({ _id: data });
  if (deleteUser.deletedCount === 1) {
    return deleteUser;
  } else {
    return false;
  }
};
exports.getSingleuser = async (data) => {
  const user = await User.findOne({ email: data });
  if (user?.email) {
    return user;
  } else {
    return false;
  }
};
