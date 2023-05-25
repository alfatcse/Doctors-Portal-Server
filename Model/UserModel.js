const mongoose=require("mongoose");
const validator= require("validator");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"],
        min:[3,"Name must be three characters at least"],
        max:[20,"Name must be lower than twenty characters"],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
        lowercase:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    role:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        validate:[validator.isURL,'Please provide a valid Url']
    },
    specialty:{
        type:String,
        required:false,
    },
    registrationnumber:{
        type:String,
        required:false,
    },
    isverified:{
        type:String,
        required:false
    }
},{ versionKey: false })
module.exports=mongoose.model("users",userSchema,"users");