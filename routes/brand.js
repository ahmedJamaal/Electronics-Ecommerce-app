const {Brand, validate} = require('../models/brand'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const brand = await Brand.find();
  res.send(brand);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  ///const brandSpec = await brandSpec.findById(req.body.brandSpecId);
  ////if (!brandSpec) return res.status(400).send('Invalid brandSpec.');

  let brand = new Brand({ 
    name: req.body.name,
    images: req.body.images
  });
  /**
   * name: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5).max(50).required(),
    brandType: Joi.string().min(5).max(50).required(),
    numberInStock: Joi.number().required(),
    tags: Joi.string().min(5).max(50).required(),
    price: Joi.number().min(0).required()
   *  "name":"amg 2"
	"brandName":"mercedeces",	
	"model":"c180 coupe",	
	"modelYear":"20120",	
	"type":"automitic",	
	"numberInStock":10,	
	"price":120,	
	"imageUrl":"pc",	
	"images":["img1","img2"],
   */
  brand = await brand.save();
  
  res.send(brand);
});
/*
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const brandSpec = await brandSpec.findById(req.body.brandSpecId);
  if (!brandSpec) return res.status(400).send('Invalid brandSpec.');

  const brand = await brand.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      brandSpec: {
        _id: brandSpec._id,
        name: brandSpec.name
      },
      numberInStock: req.body.numberInStock,
     
    }, { new: true });

  if (!brand) return res.status(404).send('The brand with the given ID was not found.');
  
  res.send(brand);
});

router.delete('/:id', async (req, res) => {
  const brand = await brand.findByIdAndRemove(req.params.id);

  if (!brand) return res.status(404).send('The brand with the given ID was not found.');

  res.send(brand);
});

router.get('/:id', async (req, res) => {
  const brand = await brand.findById(req.params.id);

  if (!brand) return res.status(404).send('The brand with the given ID was not found.');

  res.send(brand);
});
*/
module.exports = router; 