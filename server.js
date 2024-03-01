const exrpess =require("express")
const mongoose=require("mongoose")
const server_config=require("./configs/server.configs")
const db_config = require("./configs/database.config.js")
const user_model= require("./models/user.model.js")
const bcrypt=require("bcryptjs")
const app = exrpess();

// convert json to javascript object
app.use(exrpess.json())
/**
 * Create an admin user at the starting of the application
 * if not already present
 */

//Connect mongo DB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error",()=>{
    console.log("Connection Error");
})
db.once("open",()=>{
    console.log("Connection to the Mongo DB");
    init();
})

async function init(){

    //find admin user
    let user = await user_model.findOne({userId : "admin"})

    // check user is present or not
    if (user){
        console.log("admin is already present");
        return
    }

    try{
        let user = await user_model.create({
            name:"Ajaya",
            userId:"admin",
            email:"anil784888@gmail.com",
            password:bcrypt.hashSync("Ajaya123",8),
            userType:"ADMIN"
        })

        console.log("Admin is created ",user);

    }catch(err){
        console.log("Error while creating admin",err);
    }   
}



// call the routes API inside the server

require("./routes/auth.routes.js")(app)

app.listen(server_config.PORT,()=>{
    console.log("server started on : ",server_config.PORT);
})


