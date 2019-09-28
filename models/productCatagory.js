const Joi = require('joi');
const mongoose = require('mongoose');
const {Brand} = require('../models/brand');

const ProductCatgorySchema = new mongoose.Schema({
  parentName: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  childName:  {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  brand:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'brand' ,
    required:true
}]

});
const ProductCatagory= mongoose.model('productCatagory',ProductCatgorySchema)
function validateCatagory(productCatagory) {
  const schema = {
    parentName: Joi.string().max(50).required(),
    childName: Joi.string(),
    brand: Joi.array().min(1)
  };

  return Joi.validate(productCatagory, schema);
}

exports.ProductCatgorySchema = ProductCatgorySchema; 
exports.ProductCatagory = ProductCatagory; 
exports.validate = validateCatagory;