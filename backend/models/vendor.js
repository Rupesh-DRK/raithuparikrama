import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define Seller Schema
const sellerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contactInformation: {
        type: String
    },
    address: {
        type: String
    },
    paymentInformation: {
        type: String
    },
    type:{
        type:String,
        default:"seller"
    },
    profile:{
        type:String,
        default:""
    },
    status: {
        type: String,
        enum: ['active', 'suspended'],
        default: 'active'
    },
    approval:{
        type:String,
        enum : ['approved','pending'],
        default: 'pending'
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
});

// Create Seller model
const Seller = mongoose.model('Seller', sellerSchema);

export default Seller;
