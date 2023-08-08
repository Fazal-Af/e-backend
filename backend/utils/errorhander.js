class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode

        Error.captureStackTrace(this,this.constructor);

    }
    
}


module.exports = ErrorHandler



// =====================function component

// import React from 'react';

// const ErrorHandler = ({ message, statusCode }) => {
//   const stackTrace = new Error().stack;
  
//   return (
//     <div>
//       <h2>Error Handler</h2>
//       <p>Message: {message}</p>
//       <p>Status Code: {statusCode}</p>
//       <p>Stack Trace: {stackTrace}</p>
//     </div>
//   );
// };

// export default ErrorHandler;
