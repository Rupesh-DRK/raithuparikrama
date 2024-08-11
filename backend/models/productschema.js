import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    profile: {
        type: [String],
        default: []
    },
    
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:'category',
        required: true
    },
    // seller: {
    //     type: Schema.Types.ObjectId || String,
    //     ref: 'Seller', // Reference to the Seller model
    //     required: true
    // },
    seller: {
        type: Schema.Types.Mixed, // Allow any type of data (can be ObjectId or String)
        required: true
    },
   
},{ timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
