import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderItemSchema = new Schema({
    productId: {
        type: String,
        required: true
    },
    vendorId: {
        type: String,
        required: true
    },
    orderdate: {
        type: Date,
        default: Date.now
    },
    deliverystatus: {
        type: Boolean,
        required: true
    },
    paymenttype: {
        type: [String],
        required: true
    },
    paymentstatus: {
        type: Boolean,
        default: false
    }
});

const orderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    orders: [orderItemSchema]
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
