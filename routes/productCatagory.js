const {ProductCatagory, validate} = require('../models/productCatagory'); 
const {Brand} = require('../models/brand'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const productCatagorys = await ProductCatagory
  .find()
  .populate('brand','name images -_id')
  .select('parentName childName brand');
console.log(productCatagorys);;
  res.send(productCatagorys);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);


  const brand = await Brand.findById(req.body.brand);
  console.log(brand);
  if (!brand) return res.status(400).send('Invalid ProductCatagory.');


  let productCatagory = new ProductCatagory({ 
    
    parentName:req.body.parentName,
    childName:req.body.childName,
    brand:req.body.brand

  });

  productCatagory = await productCatagory.save();
  
  res.send(productCatagory);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const productCatagorySpec = await productCatagorySpec.findById(req.body.productCatagorySpecId);
  if (!productCatagorySpec) return res.status(400).send('Invalid productCatagorySpec.');

  const productCatagory = await productCatagory.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      productCatagorySpec: {
        _id: productCatagorySpec._id,
        name: productCatagorySpec.name
      },
      numberInStock: req.body.numberInStock,
     
    }, { new: true });

  if (!productCatagory) return res.status(404).send('The productCatagory with the given ID was not found.');
  
  res.send(productCatagory);
});

router.delete('/:id', async (req, res) => {
  const productCatagory = await productCatagory.findByIdAndRemove(req.params.id);

  if (!productCatagory) return res.status(404).send('The productCatagory with the given ID was not found.');

  res.send(productCatagory);
});

router.get('/:id', async (req, res) => {
  const productCatagorys = await ProductCatagory.findById(req.params.id);
  console.log(productCatagorys);
  
  if (!productCatagorys) return res.status(404).send('The productCatagory with the given ID was not found.');

  res.send(productCatagorys);
});

module.exports = router; 