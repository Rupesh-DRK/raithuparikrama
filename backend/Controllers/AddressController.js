import mongoose from 'mongoose';
import AddressModel from '../models/Address.js';
import axios from 'axios';
import https from 'https';
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const addAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const newAddress = req.body;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid UserId' });
        }

        const userAddresses = await AddressModel.findOne({ UserId: userId });
        if (!userAddresses) {
            const newUserAddresses = new AddressModel({ UserId: userId, UserAddresses: [newAddress] });
            await newUserAddresses.save();
            return res.status(201).json(newUserAddresses);
        }
        userAddresses.UserAddresses.push(newAddress);
        await userAddresses.save();
        res.status(201).json(userAddresses.UserAddresses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const updateAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const updatedAddress = req.body;

        if (!isValidObjectId(userId) || !isValidObjectId(addressId)) {
            return res.status(400).json({ message: 'Invalid UserId or AddressId' });
        }

        const userAddresses = await AddressModel.findOne({ UserId: userId });
        if (!userAddresses) {
            return res.status(404).json({ message: 'User not found' });
        }
        const address = userAddresses.UserAddresses.id(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        address.set(updatedAddress);
        await userAddresses.save();
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// controllers/addressController.js



// controllers/addressController.js



export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    
    // Find the user's address document by userId
    const userAddress = await AddressModel.findOne({ UserId: userId });

    if (!userAddress) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find the index of the address to delete
    const addressIndex = userAddress.UserAddresses.find(address => address._id === addressId);


    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found." });
    }

    // Remove the address from the array
    userAddress.UserAddresses.splice(addressIndex, 1);

    // Save the updated document
    await userAddress.save();

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const getPincodeData = async (req, res) => {
  

// Create a custom Axios instance with an HTTPS agent
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, // Disable SSL verification
    }),
});
    try {
        const { pincode } = req.params;
        if (!pincode || !/^\d{6}$/.test(pincode)) {
            return res.status(400).json({ error: 'Invalid pincode format' });
        }

        const response = await  axiosInstance.get(`https://api.postalpincode.in/pincode/${pincode}`);
        const pincodeData = response.data[0];

        if (pincodeData.Status === 'Success') {
            res.json({pincodeData});
        } else {
            res.status(404).json({ error: 'Pincode not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getOneAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;

        if (!isValidObjectId(userId) || !isValidObjectId(addressId)) {
            return res.status(400).json({ message: 'Invalid UserId or AddressId' });
        }

        const userAddresses = await AddressModel.findOne({ UserId: userId });
        if (!userAddresses) {
            return res.status(404).json({ message: 'User not found' });
        }
        const address = userAddresses.UserAddresses.id(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json(address);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid UserId' });
        }

        const addresses = await AddressModel.findOne({ UserId: userId });
        if (!addresses) {
            return res.status(404).send({ message: "No addresses found for this user." });
        }
        res.status(200).send(addresses.UserAddresses);
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};
