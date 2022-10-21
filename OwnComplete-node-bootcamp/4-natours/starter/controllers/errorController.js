const AppError = require("../utils/appError");

 
 const handleCastErrorDB=(err)=>{

   const message= `Invalid ${err.path}:${err.value}`

    return new AppError(message,400);


  }

const handleDuplicateFieldsDB= err=>{

  

   const value=err.errmsg.match(/(["'])(\\?.)*?\1/)[0]

   
  const message= `Duplicate  field value ${value}. please use anohter value `

  return new AppError(message,400);

}


const handleValidationErrorDB= err=>{

  const errors=Object.values(err.errors).map(el => el.message)

      const message=`Invalid input data .${errors.join('. ')}`

      return  new AppError(message,400)

}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {

  //operation , trusted error : send message to clinet
   if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // programming or other unkown error : don't leak error details
   }else{

    //  1) Log error
     console.log('ERROR 🔥 ',err)

     // 2) Send generic message

    res.status(500).json({
       status:'error',
       message:'Something went very worng'

    })

   }

};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {

     let error={...err};

   if(error.name=== 'CastError') error=handleCastErrorDB(error)

  if(error.code=== 11000) error=handleDuplicateFieldsDB(error)

  if(error.name=== 'ValidatoionError') error=handleValidationErrorDB(error)

    sendErrorProd(error, res);
  }
};
