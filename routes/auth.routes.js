/**
 * POST localhost:5000/e_comm_be/api/v1/auth/signup
 * 
 * I need to intecept this
 */

const authController =require("../controller/auth.controller")
const authMW =require("../middlewares/auth_mw")

//
module.exports = (app)=>{
    app.post("/e_comm_be/api/v1/auth/signup",[authMW.verifySignUpBody],authController.signup)

    // POST localhost:5000/e_comm_be/api/v1/auth/signin
    app.post("/e_comm_be/api/v1/auth/signin",authController.signin)
}
