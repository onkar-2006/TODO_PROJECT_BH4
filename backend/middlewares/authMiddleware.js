const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies; 
  if (!token) {
    return res.status(401).json({ message: 'Please login to access this resource' });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
};


