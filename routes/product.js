const {Product, validate} = require('../models/product'); 
const {ProductCatagory} = require('../models/productCatagory');
const {Brand} = require('../models/brand');
const mongoose = require('mongoose');
const express = require('express');
const Fawn = require('fawn');
const router = express.Router();

////Fawn.init(mongoose);
router.get('/', async (req, res) => {
  const products = await Product
  .find()
  .populate('brand','name images -_id');
  res.send(products);
});

router.post('/', async (req, res) => {
 const { error } = validate(req.body); 
  console.log(req.body.productTypeId);

  if (error) return res.status(400).send(error.details[0].message);

  const productCatagory = await ProductCatagory.findById(req.body.productCatagoryId);
  console.log(productCatagory);
  
  if (!productCatagory) return res.status(400).send('Invalid ProductCatagory.');

  let product = new Product({ 
    name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    tags: req.body.tags,
    imageUrl: req.body.imageUrl,
    numberInStock: req.body.numberInStock,
    price: req.body.price,
    productCatagoryId:{
        id:productCatagory._id,
        parentName:productCatagory.parentName,
        childName: productCatagory.childName
    },
    specification:req.body.specification,
    brand:req.body.brand
 
  });

  product = await product.save();
  
  res.send(product);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
/// console.log(error);
  
  if (error) return res.status(400).send(error.details[0].message);

 
  const productCatagory = await ProductCatagory.findById(req.body.productCatagoryId);
  if (!productCatagory) return res.status(400).send('Invalid productCatagory.');

  const brand = await Brand.findById(req.body.brand);
  if (!brand) return res.status(400).send('Invalid brand.');

  const product = await Product.findByIdAndUpdate(req.params.id,
    { 

      name: req.body.name,
    brand: req.body.brand,
    description: req.body.description,
    tags: req.body.tags,
    imageUrl: req.body.imageUrl,
    numberInStock: req.body.numberInStock,
    price: req.body.price,
    productCatagory:{
      productCatagoryId:req.body.productCatagoryId,
        parentName:productCatagory.parentName,
        childName: productCatagory.childName
    },
    specification:req.body.specification,
    brand:req.body.brand
     
    }, { new: true });

 res.send(product);
});

router.delete('/:id', async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send('The Product with the given ID was not found.');

  res.send(product);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send('The Product with the given ID was not found.');

  res.send(product);
});

module.exports = router; 