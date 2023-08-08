// catchAsyn is written for promise to get respon we write it in separate part 
module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };