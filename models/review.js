const Joi = require('joi');
const mongoose = require('mongoose');
const {Product} = require('../models/product');

const reviewSchema = new mongoose.Schema({
  reviewText: {
    type: String,
    required: true,
    trim: true, 
    maxlength: 255
  },
  submitted_date: {
    type: Date,
    default: Date.now()
  },
  submitted_by: {
    type: String,
    required: true
    
  },
  VerfiedCustomer: {
    type: Boolean,
    required: true,
    trim: true, 
    default:false
  },
  rating: {
    type: Number,
     maxlength: 255,
     default:0
  },
  product: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' ,
     required:true
  },
  

});
const Review= mongoose.model('review',reviewSchema)
function validateReview(review) {
  const schema = {
    reviewText: Joi.string().max(250).required(),
    submitted_date: Joi.date(),
    submitted_by: Joi.string().max(50).required(),
    VerfiedCustomer: Joi.boolean(),
    rating: Joi.number().min(0).max(10),
    product: Joi.string()

    
  };

  return Joi.validate(review, schema);
}

exports.reviewSchema = reviewSchema; 
exports.Review = Review; 
exports.validate = validateReview;