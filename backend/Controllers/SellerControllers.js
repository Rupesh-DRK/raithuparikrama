import { request } from 'express';
import Seller from '../models/vendor.js';
import jwt from 'jsonwebtoken'

export const addSeller = async (req, res) => {
  try {
    const { name, email, password, contactInformation, address, paymentInformation, profile } = req.body;
    const newSeller = new Seller({
      name,
      email,
      password,
      contactInformation,
      address,
      paymentInformation,
      profile
    });
    const savedSeller = await newSeller.save();
    res.status(201).json(savedSeller);
  } catch (error) {
    console.error('Error adding seller:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const loginSeller = async (req, res) => {
    const { email, password } = req.body;

    try {        
        const seller = await Seller.findOne({ email });

        if (!seller) {
            return res.status(400).json({ success: false, error: "Seller not found" });
        }
        if (seller.approval !== "approved"){
          return res.status(400).json({ success: false, error: "Approval required" });

        }
        // Compare plain text password (not recommended for production)
        if (password !== seller.password) {
            return res.status(400).json({ success: false, error: "Wrong password" });
        }

        // Password is correct, generate JWT token
        const token = jwt.sign({ _id: seller._id }, process.env.JWT_SEC, { expiresIn: '20m' });

        // Remove password from user data
        const { password: _, ...userData } = seller.toObject();

        res.status(200).json({ success: true, user: userData, token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const getSeller = async (req, res) => {
  try {
    const sellerId =  req.params.id || req.body.id;
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.status(200).json(seller);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateSeller = async (req, res) => {
  const userId = req.body.userId;
  const requestedUserId = req.params.id;

  if (userId !== requestedUserId) {
    return res.status(401).json("You can update only your account!");
  }

  try {
    const updatedUser = await Seller.findByIdAndUpdate(
      requestedUserId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "An error occurred while updating the user." });
  }
};

export const getAllSellers= async (req, res) =>{
try {
  const sellers = await Seller.find()
  res.status(200).send( sellers )
  
} catch (error) {
  res.status(500).json({ error: "sellers not found.."})
}
}

export const approveSeller = async (req,res) => {
 const {id} = req.params;
 const approval = {approval : "approved"}
 const result = await Seller.findByIdAndUpdate(id,
  {$set : approval},
  { new : true}
 );
 res.status(200).json(result);
}

export const disapproveSeller = async (req,res) => {
  const {id} = req.params;
  const disapproval = {approval : "disapproved"}
  const result = await Seller.findByIdAndUpdate(id,
   {$set : disapproval},
   { new : true}
  );
  res.status(200).json(result);
 }
 
 export const notifyApproval = async (req,res) => {
  const {id} = req.params;
  const notify = {notify : "yes"}
  const result = await Seller.findByIdAndUpdate(id,
   {$set : notify},
   { new : true}
  );
  res.status(200).json(result);
 }
 
 export const notifyDisapproval = async (req,res) => {
   const {id} = req.params;
   const notify = {notify : "no"}
   const result = await Seller.findByIdAndUpdate(id,
    {$set : notify},
    { new : true}
   );
   console.log(result)
   res.status(200).json(result);
  }
