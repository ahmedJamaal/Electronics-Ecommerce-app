const winston= require('winston');
const express = require('express');


const app = express();

require('./startUp/logging')();
require('./startUp/routes')(app);
require('./startUp/mongoDb')();
require('./startUp/config')();
require('./startUp/validation')();


////throw new error('hellll');
/*
const p=Promise.reject(new Error('something filled promise..'));
p.then(() =>{console.log(done)
});*/
/**(node:5200) 
 * DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
 */


/*
console.log(app.get('jwtPrivateKey'));
console.log(`node envirment ${process.env.NODE_ENV}`);*/



const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));