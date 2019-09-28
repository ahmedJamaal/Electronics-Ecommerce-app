const Joi = require('joi');
const mongoose = require('mongoose');
const {ProductCatgorySchema} = require('./productCatagory');
const {Brand} = require('./brand');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  description: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  numberInStock: { 
    type: Number, 
    min: 0
  },
  price: { 
    type: Number, 
    required: true,
    min: 0

  },
  tags: [String],
  imageUrl: [String],

  productCatagory:{
      type: ProductCatgorySchema,
      required:true
  },
  specification:{
   type:Object
  },
  brand:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'brand' ,
    required:true
},


});
const Product= mongoose.model('product',ProductSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    brand: Joi.string().required(),
    description: Joi.string().min(3).max(50).required(),
    numberInStock: Joi.number().min(0).required(),
    tags: Joi.array().required(),
    imageUrl: Joi.array().required(),
    price: Joi.number().min(0).required(),
    productCatagoryId: Joi.string().required(),
    specification: Joi.required()
    
  };
  return Joi.validate(product, schema);

}
exports.ProductSchema = ProductSchema; 
exports.Product = Product; 
exports.validate = validateProduct;