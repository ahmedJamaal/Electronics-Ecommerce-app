const {Review, validate} = require('../models/review'); 
const {Product} = require('../models/product'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const review = await Review.find();
  res.send(review);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findById(req.body.productId);
 
  if (!product) return res.status(400).send('Invalid ProductID.');

  let review = new Review({ 
    reviewText: req.body.reviewText,
    submitted_by: req.body.submitted_by,
    rating: req.body.rating,
    product: req.body.product
    
  });
  review = await review.save();
  
  res.send(review);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const review = await review.findByIdAndUpdate(req.params.id,
    { 
      title: req.body.title,
      reviewSpec: {
        _id: reviewSpec._id,
        name: reviewSpec.name
      },
      numberInStock: req.body.numberInStock,
     
    }, { new: true });

  if (!review) return res.status(404).send('The review with the given ID was not found.');
  
  res.send(review);
});

router.delete('/:id', async (req, res) => {
  const review = await review.findByIdAndRemove(req.params.id);

  if (!review) return res.status(404).send('The review with the given ID was not found.');

  res.send(review);
});

router.get('/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) return res.status(404).send('The review with the given ID was not found.');

  res.send(review);
});

module.exports = router; 