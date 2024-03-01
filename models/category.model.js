/**
 * Name 
 * description
 */

const mongoose =require("mongoose")

const categorySchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique :true
    },
    description:{
        type:String,
        require:true
    }
},{timestamps:true,versionKey:false})

module.exports = mongoose.model("Category",categorySchema)