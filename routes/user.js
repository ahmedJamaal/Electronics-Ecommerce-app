const {User, validate} = require('../models/user'); 
const config=require('config');
const asyncMiddleWare =require('../middleWare/async');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const _= require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', asyncMiddleWare (async (req, res) => {
  //throw new Error('could not find product');
  const users = await User.find();
  res.send(users);
}));

router.post('/', async (req, res) => {
  
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email:req.body.email});
  if (user) return res.status(400).send("This User is Already Register..");
 
  user = new User(_.pick(req.body,['firstName','lastName','email','password',
                                    'mobile','city','street','permission']));
                                  
  const salt =await bcrypt.genSalt(10);
   user.password=await bcrypt.hash(req.body.password,salt);
  user = await user.save();
  const token=user.generateAuthToken();
  res.header("x-auth-token",token).send(_.pick(user,['firstName','firstName','email']));
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });

  if (!user) return res.status(404).send('The user with the given ID was not found.');
  
  res.send(user);
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.send(user);
});

module.exports = router; 