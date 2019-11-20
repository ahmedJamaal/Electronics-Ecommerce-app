module.exports= function (handler)
{
  return async (req,res ,next) =>{
    try {
      await handler(req,res);
    } catch (ex) {
      next(ex);
    }
  };

}

/* if this not working install 
  express-async-errors package 
  to sure that make route handler
  make rquired in app.js
  required('express-async-errors');
  */ 