const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.statusCode = 400;
    throw new Error('Missing some fields.')
  }

  const userExists = await User.findOne({email});
  if (userExists) {
    res.statusCode = 400;
    throw new Error('There is already an account associated with this email.');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name, 
    email,
    password: hashedPassword
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    throw new Error('Something went wrong.');
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email});
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.statusCode = 400;
    throw new Error('Invalid credentials.');
  }
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email
  });
});

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "1h"
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser
}