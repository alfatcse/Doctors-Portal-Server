const User = require("../Model/UserModel");
exports.allUsers = async (data) => {
    console.log(data);
  const query = { role: data };
  const users = await User.find(query);
  console.log(users);
  if (users.length>0) {
    return users;
  }
};
exports.createUser = async (data) => {
  const user = await User.create(data);
  console.log(user);
  return user;
};
exports.getRole = async (data) => {
  const userRole = await User.findOne({ email: data }).select("role");
  if (userRole?.role) {
    return userRole.role;
  }
};
