const User=require("../Model/UserModel");
exports.allUsers=async ()=>{
    console.log('service');
    const query={}
    const users=await User.find(query);
    if(users){
        return users
    }
}
exports.createUser=async (data)=>{
    console.log(data);
    const user=await User.create(data);
    console.log(user);
    return user
}