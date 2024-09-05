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

    seller: {
        type: Schema.Types.Mixed, 
        required: true
    },
    visits: {
        type: Number,
        default: 0,  
        min: 0,     
      },
    
   
},{ timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
