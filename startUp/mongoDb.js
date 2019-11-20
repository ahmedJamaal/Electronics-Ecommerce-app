const mongoose = require('mongoose');
const winston= require('winston');

module.exports=function (){
    /**(node:5200) 
    * DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    */
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    
    mongoose.connect('mongodb://localhost/ecommerceTest',{ useNewUrlParser: true })
        .then(() => winston.info('Connected to MongoDB...'));


}