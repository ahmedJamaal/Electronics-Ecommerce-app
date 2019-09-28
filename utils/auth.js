const jwt = require('jsonwebtoken');
const config = require('config');


function auth( req, res , next){
    console.log('hello token midelware');
const token=req.header("x-auth-token");
console.log('token =',token);

if(!token) return res.status(401).send("Access Denied: no token found");

    try{
        const decode=jwt.decode(token,config.get('jwtPrivateKey'));
        req.user=decode;
        next();
    }

    catch(err){
      res.status(400).send('Invalid Token..');
    }
}
module.exports=auth;