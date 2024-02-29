/**
 * create your database and create your schema
 */
//const { default: mongoose } = require("mongoose")
const mogoose= require("mongoose")

const userSchema = new mogoose.Schema({
    name:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        lowercase:true,
        minLength:10,
        unique:true
    },
    userType:{
        type:String,
        require:true,
        default:"COSTUMER",
        enum:["COSTUMER","ADMIN"]
    }
},{timeseries:true,versionKey:false})

const  userModel=mogoose.model("user",userSchema);
module.exports = userModel;

