const Joi = require('joi');
const mongoose = require('mongoose');
const config=require('config');
const jwt=require('jsonwebtoken');
const UserSchema=new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true, 
    maxlength: 255
  },
  lastName: {
    type: String,
    required: true,
    trim: true, 
   maxlength: 255
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    trim: true, 
    maxlength: 1024
  },
  
  mobile: {
    type: String,
    required: true,
    trim: true, 
  },

  address: { 
   type:Object,
    city:{
      type:String
    },
    street:{
      type:String
    }

  },
  permission :{
    type:String,
    minlength: 1,
    default:'customer'
  }

});
UserSchema.methods.generateAuthToken = function (){

  const token=jwt.sign({_id:this._id , permission:this.permission} , config.get('jwtPrivateKey'));
  return token;
}
const User= mongoose.model('users',UserSchema);
function validatUser(user) {
  const schema = {
    firstName: Joi.string().max(50).required(),
    lastName: Joi.string().max(50).required(),
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(4).max(255).required(),
    mobile: Joi.string().length(11).required(),
    address: Joi.required(),
    permission: Joi.string().min(1)
  };

  return Joi.validate(user, schema);
}


exports.User = User; 
exports.validate = validatUser;