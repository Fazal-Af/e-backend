const app=require('./app')
const cloudinary = require("cloudinary");

//import dotenv from config/config.env
const dotenv=require("dotenv")
const connectDatabase=require("./config/database");
const { mongo, default: mongoose } = require('mongoose');

// Handling Uncaught Exception  i.e console.log(youtube)=> out youtube not define 
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

//config
dotenv.config({path:"backend/config/config.env"});
//connecting to database
connectDatabase();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


app.listen(process.env.PORT,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})
// Unhandled Promise Rejection  i.e mongodb name change by mistake mongo
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });