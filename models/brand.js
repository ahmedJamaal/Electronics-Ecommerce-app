const Joi = require('joi');
const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    maxlength: 255
  },
  images: {
    type: Array,
    required: true,
   maxlength: 255
  }

});
const Brand= mongoose.model('brand',brandSchema)
function validateBrand(brand) {
  const schema = {
    name: Joi.string().max(50).required(),
    images: Joi.array().min(1).max(10).required()
    
  };

  return Joi.validate(brand, schema);
}

exports.brandSchema = brandSchema; 
exports.Brand = Brand; 
exports.validate = validateBrand;