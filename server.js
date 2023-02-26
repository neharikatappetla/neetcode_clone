const dotenv = require("dotenv");
dotenv.config();

const str = process.env.MONGO_CONNECTION_STRING;

const express =require("express");

const app = express();

const mongoose = require("mongoose");
const courseLib = require('./backend/lib/courseLib');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_CONNECTION_STRING,async function(err){
    if(err)
        console.error(err);
    else{
        console.log("DB Connection Successful");
        await courseLib.createFirstCourse();
        const courses = await courseLib.getAllCourses();

        app.listen(3000,function(){
            console.log("Server running on http://localhost:3000");
        });

    }
})


app.use(express.static("frontend"))

app.get("/",function(req, res){
    res.sendFile(__dirname +"/frontend/index.html")
})

//Javascript object notation JSON  
