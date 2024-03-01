/**
 * POST localhost:5000/e_comm_be/api/v1/auth/signup
 * 
 * I need to intecept this
 */
const authCat=require("../controller/category.controller")
const authMw=require("../middlewares/auth_mw")

//
module.exports = (app)=>{
    app.post("/e_comm_be/api/v1/auth/category",[authMw.verifyToken,authMw.isAdminCheck],authCat.createNewCategory)
}
