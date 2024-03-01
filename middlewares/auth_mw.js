const user_model=require("../models/user.model")
const jwt=require('jsonwebtoken')
const auth_config=require('../configs/auth.config')
/**
 * Create a mw will check it the reqest body is proper or not
 */

const verifySignUpBody= async(req,res,next)=>{
    try{
        //check name
        if(!req.body.name){
            return res.status(400).send({
                msg:"Failed ! name was not provide in request body"
            })
        }
        //check email
        if(!req.body.email){
            return res.status(400).send({
                msg:"Failed ! email was not provide in request body"
            })
        }

        //check userId
        if(!req.body.userId){
            return res.status(400).send({
                msg:"Failed ! userId was not provide in request body"
            })
        }
        
        //check if the user with same userId is already present
        const user=await user_model.findOne({userId:req.body.userId})
        if(user){
            return res.status(400).send({
                msg:"Failed ! userId is already exist"
            })
        }

        next()

    }catch(err){
        console.log("Error while validating requestb obj",err);
        res.status(500).send({
            msg:"Error while validating th request body"
        })
    }
}

const vrifySigninBody=(req,res,next)=>{
    if(!req.body.userId){
        return res.status(400).send({
            msg:"userId is not provided"
        })
    }
    if(!req.body.password){
        return res.status(400).send({
            msg:"password is not provided"
        })
    }
    
    next()
}

// token virify for

const verifyToken= (req,res,next)=>{
    //check is the token is present in the header
    const token=req.headers['x-access-token']

    if(!token){
        res.status(403).send({
            msg:"No Token found : UnAuthorized !"
        })
    }
    //if its valid token

    jwt.verify(token,auth_config.secret, async (err,decoded)=>{
        if(err){
            return res.status(401).send({
                msg:"UnAuthorized !"
            })
        }
        const user= await user_model.findOne({userId:decoded.id})

        if(!user){
            return res.status(401).send({
                msg:"UnAuthorized ,this user for this token does not exist"
            })
        }
        //set the user info in the req.body
        req.user =user
        //if all of them is success the move to the next step
        next()
    })  
}

const isAdminCheck=(req,res,next)=>{
    const user=req.user

    if(user && user.userType == "ADMIN"){
        next()
    }else{
        return res.status(403).send({
            msg:"Only ADMIN user allowed to acces this ..."
        })
    }
}

module.exports ={
    verifySignUpBody : verifySignUpBody,
    vrifySigninBody:vrifySigninBody,
    verifyToken:verifyToken,
    isAdminCheck:isAdminCheck
}