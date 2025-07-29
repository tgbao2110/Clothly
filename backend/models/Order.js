import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  addressId: {
    type: mongoose.Schema.ObjectId,
    ref: "Address",
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
      },
      qty: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "delivering", "delivered", "cancelled", "unknown"],
    default: "pending"
  },
  notes: {
    type: String
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);