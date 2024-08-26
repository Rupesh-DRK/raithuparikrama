import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      }, 
    ],
    payment: {
      transactionId: { type: String, required: true }, 
      method: { type: String, required: true },
      amount: { type: Number, required: true },
      status: { type: String, default: "Pending" },
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
      required:true,
    },
    seller:{
      type : mongoose.ObjectId,
      ref : "Seller",
      required:true,

    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
