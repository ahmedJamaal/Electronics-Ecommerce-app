const Joi = require('joi');
const mongoose = require('mongoose');
const {Product} = require('../models/product');
const {Customers} = require('../models/customer');

const orderSchema = new mongoose.Schema({
  order_date: {
    type: Date,
    default: Date.now()
  },
  duration_day: {
    type: number,
    required: true
    
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customers' ,
    require:true
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product' ,
     required:true
  }]
  

});
const Order= mongoose.model('order',orderSchema)
function validateOrder(order) {
  const schema = {
    order_date: Joi.date(),
    duration_day: Joi.number().min(1).max(31).required(),
    customer: Joi.string(),
    product: Joi.array().min(1).max(100)

    
  };

  return Joi.validate(order, schema);
}

exports.orderSchema = orderSchema; 
exports.Order = Order; 
exports.validate = validateOrder;