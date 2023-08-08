const ErrorHandler= require("../utils/errorhander")

module.exports=(err,req,res,next)=>{
    err.statusCode= err.statusCode||500;
    err.message=err.message||"internal server Error";


     // Wrong Mongodb Id error also called cast error it appear in postman to test API i.e if complet id wrong formation like id = afjkdj it ot in mongo formate for that the below error will apear
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }


    // Mongoose duplicate key error   i.e  email error
if (err.code === 11000) {
  const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
  err = new ErrorHandler(message, 400);
}

// Wrong JWT error
if (err.name === "JsonWebTokenError") {
  const message = `Json Web Token is invalid, Try again `;
  err = new ErrorHandler(message, 400);
}

// JWT EXPIRE error
if (err.name === "TokenExpiredError") {
  const message = `Json Web Token is Expired, Try again `;
  err = new ErrorHandler(message, 400);
}

res.status(err.statusCode).json({
  success: false,
  message: err.message,
});
}




