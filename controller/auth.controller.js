/**
 * I need to write the cotroller  / logic to register a suer
 * 
 */
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const user_model=require("../models/user.model")
const secret=require("../configs/auth.config")

exports.signup= async(req,res) => {
    //logic to create the user
    //1. Read the request body
    const request_body=req.body
 
    //2. Insert the data in the suer collection in mongoDB
    //get the data from body
    const userObj={
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
        password:bcrypt.hashSync(request_body.password,8),
        userType:request_body.userType
    }
    try{
        const user_created= await user_model.create(userObj)
        //return the user
        //return the response without password
        const res_obj={
            name:request_body.name,
            userId:request_body.userId,
            email:request_body.email,
            userType:request_body.userType,
        }
        //201 is the code of succefull send 
        res.status(201).send(res_obj)

    }catch(err){
        console.log("Error wwhile register the user",err);
        res.status(500).send({
            msg:"Error while register the user"
        })
    }
    //3. Return the response back to the user

}

exports.signin =async(req,res)=>{
    //Check if the user id is present in the system
    //find userId from database which is match to req.body.name
    const user = await user_model.findOne({userId:req.body.userId})
    if(user== null){
        return res.status(400).send({

            msg:"userId passed is not valid userId !"
        })
    }

    //Check password is coorect
    //compare bcrypt passwrod using compareSync and return true or false
    const isPasswordValid = bcrypt.compareSync(req.body.password,user.password)
    if(!isPasswordValid){
        return res.status(401).send({
            msg:"Password is incorect..!"
        })
    }

    //if userId and passwrod is correct then
    //using jwt we will create access token eith a given TTL(time to left) and return 
    const token = jwt.sign({id:user.userId},secret.secret,{
        expiresIn:120
    })
    res.status(200).send({
        msg:"Login Success your Details ...",
        name:user.name,
        userId:user.userId,
        email:user.email,
        userType:user.userType,
        accessToken:token
    })

}