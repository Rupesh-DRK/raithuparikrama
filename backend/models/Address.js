import mongoose from 'mongoose';

const { Schema } = mongoose;

const addressSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Village: {
        type: String,
        required: true
    },
    PinCode: {
        type: Number,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        default: 'India'
    },
    Mobile: {
        type: Number,
        required: true
    }
});

const Address = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    UserAddresses: [addressSchema] 
});

const AddressModel = mongoose.model('Address', Address); 

export default AddressModel;
