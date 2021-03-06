const winston= require('winston');

module.exports=function(){

    winston.exceptions.handle(
        new winston.transports.Console({colorize:true ,prettyPrint:true}),
        new winston.transports.File({filename: 'uncaughtException.log' ,
        handleExceptions: true})
      );

    process.on('unhandledRejection',(ex) => {
    throw ex;
    });
    
    winston.add(new winston.transports.File({ filename: 'logfile.log'}));
}