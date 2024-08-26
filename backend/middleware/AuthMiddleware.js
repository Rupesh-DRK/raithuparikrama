import jwt from 'jsonwebtoken';
import Seller from '../models/vendor.js';
import User from "../models/userSchema.js"
import Admin from '../models/adminSchema.js';

export const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      throw new Error('JWT token is missing');
    }
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    req.user = decoded; // Optionally, you can attach the decoded user information to the request object
    next();
  } catch (error) {
    console.error('JWT verification failed:', error.message);
    res.status(401).json({ error: 'Unauthorized' });  
  }
};
  
export const isSeller = async (req, res, next) => {
  try {
    const user = await Seller.findById(req.user._id);
    if (!user || user.type !== 'seller') { // Check if user does not exist or is not a seller
      return res.status(401).send({
        message: "Not Authorized"
      });
    }
    next(); // Proceed to the next middleware if user is a seller
  } catch (err) {
    console.error('Error checking seller status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || user.type !== 'consumer') { 
      return res.status(401).send({
        message: "Not Authorized"
      });
    }
    next(); 
  } catch (err) {
    console.error('Error checking seller status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await Admin.findById(req.user._id);
    if (!user || user.type !== 'admin') { 
      return res.status(401).send({
        message: "Not Authorized"
      });
    }
    next(); 
  } catch (err) {
    console.error('Error checking admin status:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};