const express = require('express');
const product = require('../routes/product');
const productCatagory = require('../routes/productCatagory');
const brands = require('../routes/brand');
const review = require('../routes/review');
const user = require('../routes/user');
const auth = require('../routes/auth');
const error =require ('../middleWare/error');

module.exports=function (app){

    app.use(express.json());
    app.use(express.urlencoded({extended :true}));
    app.use('/api/productCatagory', productCatagory);
    app.use('/api/brands', brands);
    app.use('/api/product', product);
    app.use('/api/review', review);
    app.use('/api/user', user);
    app.use('/api/auth', auth);

    app.use(error);

}