const category_model=require("../models/category.model")

/**
 * Controller for creating category
 * localhost:5000/e_comm_be/api/v1/auth/category
 * {
 *      "name":"Housebold",
 *      "description":"This will have all the housebold items"
 * }
 */

exports.createNewCategory = async(req,res)=>{

    //Read the req body
    //Create the category object
    const cate_data={
        name:req.body.name,
        description:req.body.description
    }
    try{
        //insert into mongoDB
        const category = await category_model.create(cate_data)
        res.status(201).send({
            category
        })
    }
    catch(err){
        console.log("while creating the category",err);
        res.status(500).send({
            msg:"Error while creating category"
        })
    }

    //delete from mongoDB
}