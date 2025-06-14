import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
        image: String,
        title: String,
        description: String,
        category: String,
        brand: String,
        price: Number,
        salePrice: Number,
        stock: Number
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema)