/**
 * 13

You do not need to save and check the token from the database. 
This token such a mechanism can be decoded with only your-server, 
and if it was done that the token is valid. The code that you want to do should look like.
 */

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/login', function(req, res, next) {
  var user = {name:'test'}; //!! find the user and check user from db then

    var token = jwt.sign(user, 'secret', {
            expiresInMinutes: 1440
          });

    res.cookie('auth',token);
    res.send('ok');

});

app.use(function(req, res, next) {

  var token = req.cookies.auth;

  // decode token
  if (token) {

    jwt.verify(token, 'secret', function(err, token_data) {
      if (err) {
         return res.status(403).send('Error');
      } else {
        req.user_data = token_data;
        next();
      }
    });

  } else {
    return res.status(403).send('No token');
  }
});


/**
 *  // AUTHENTICATION
 app.use(async (req) => {
     try {
         const token = req.headers.authorization || req.cookies.auth
         const { person } = await jwt.verify(token, SECRET)
         req.person = person
         return req.next()
     } catch (e) {
         return req.next()
     }
 })
 */