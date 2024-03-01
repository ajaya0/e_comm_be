const user_model=require("../models/user.model")
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

module.exports ={
    verifySignUpBody : verifySignUpBody
}