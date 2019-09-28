const config = require('config'); 
const {User} = require('../models/user'); 
const auth = require('../utils/auth'); 
const authorizedAdmin = require('../utils/authorized'); 
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Joi = require('joi');
const _= require('lodash');
const express = require('express');
const router = express.Router();

router.get('/',auth, async (req, res) => {
  console.log('router handler ');
  
  const users = await User.find();

  res.send(users);
});

router.delete('/:id',[auth,authorizedAdmin], async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.post('/', async (req, res) => {
  
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email:req.body.email});
  console.log(user)
  if (!user) return res.status(400).send("Invalid Email or Password..");

  let isvalid = await bcrypt.compare( req.body.password ,user.password);
  console.log(isvalid);
  
  if (!isvalid) return res.status(400).send("Invalid Email or Password..");

  const token=user.generateAuthToken();
  res.send(token);
});
//information expert pricples


function validate(user) {
    const schema = {
        email: Joi.string().max(255).required().email(),
      password: Joi.string().min(4).max(255).required(),
    };
  
    return Joi.validate(user, schema);
  }
  

module.exports = router; 