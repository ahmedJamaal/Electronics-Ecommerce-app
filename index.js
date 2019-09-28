const config = require('config'); 
const mongoose = require('mongoose');
const express = require('express');
const product = require('./routes/product');
const productCatagory = require('./routes/productCatagory');
const brands = require('./routes/brand');
const review = require('./routes/review');
const user = require('./routes/user');
const auth = require('./routes/auth');

const app = express();

/**(node:5200) 
 * DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
 */
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

if(!config.get('jwtPrivateKey')){
  console.log("Fatal Error : jwtPrivatekey Not Found ");
  process.exit(1);
}

console.log(config.get('jwtPrivateKey'));

mongoose.connect('mongodb://localhost/ecommerceTest',{ useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use('/api/productCatagory', productCatagory);
app.use('/api/brands', brands);
app.use('/api/product', product);
app.use('/api/review', review);
app.use('/api/user', user);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));