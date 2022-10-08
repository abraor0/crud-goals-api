const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select('-password');
      next();
    } catch(err) {
      console.log(err);
      res.statusCode = 401;
      throw new Error('Not authorized');
    }
  } else {
      res.statusCode = 401;
      throw new Error('Not authorized, missing token');
  }
});

module.exports = auth;