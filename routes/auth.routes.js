/**
 * POST localhost:5000/e_comm_be/api/v1/auth/signup
 * 
 * I need to intecept this
 */

const authController =require("../controller/auth.controller")


//
module.exports = (app)=>{
    app.post("/e_comm_be/api/v1/auth/signup",authController.signup)
}
