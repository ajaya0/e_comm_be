/**
 * I need to write the cotroller  / logic to register a suer
 * 
 */
const bcrypt=require("bcryptjs")
const user_model=require("../models/user.model")

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