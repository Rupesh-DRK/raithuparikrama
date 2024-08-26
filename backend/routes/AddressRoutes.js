import express from 'express';
import { addAddress, updateAddress, deleteAddress, getPincodeData, getOneAddress, getAllAddress } from '../Controllers/AddressController.js';

const router = express.Router();

// Add a new address
router.post('/:userId/add', addAddress); 

// Update an existing address
router.put('/:userId/update/:addressId', updateAddress);

// Delete an address
router.delete('/:userId/delete/:addressId', deleteAddress);

// Get pincode data
router.get('/pincode/:pincode', getPincodeData);

// Get one address
router.get('/:userId/getaddress/:addressId', getOneAddress);

// Get all addresses for a user
router.get('/:userId/alladdresses', getAllAddress);

export default router;
