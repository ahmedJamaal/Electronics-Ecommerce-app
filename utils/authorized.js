const jwt = require('jsonwebtoken');
const config = require('config');


function authorizedAdmin( req, res , next){
   
    if(req.user.permission =='customer') return res.status(403).send("Access Denied:");
    next();
}
module.exports=authorizedAdmin;