import { imageUploadUtil, imageDeleteUtil } from '../../helpers/cloudinary.js'
import { Product } from '../../models/Product.js';
//
//
// Image Upload
const handleImageUpload = async(req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        const url = `data:${req.file.mimetype};base64,${b64}`;
        const result = await imageUploadUtil(url);

        res.status(200).json({
            success: true,
            result
        })
    } catch (error) {
        console.log('Error uploading image: ',error)
        res.status(500).json({
            success: false,
            message: 'Error uploading image'
        })
    }
}
//
//
// CREATE
const createProduct = async(req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).json({
            success: true,
            data: newProduct,
            message: "Product added successfully"
        })
    } catch (error) {
        console.log("Error creating product: ", error)
        res.status(500).json({
            success: false,
            message: "Error creating product"
        })
    }
}
//
//
// GET ALL
const getAllProducts = async(req, res) => {
    try {
        const products = await Product.find({});

        res.status(200).json({
            success: true,
            data: products,
            message: "All products fetched successfully"
        })
    } catch (error) {
        console.log("Error fetching products: ", error)
        res.status(500).json({
            success: false,
            message: "Error fetching products"
        })
    }
}
//
//
// GET BY ID
const getProductById = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Product fetched successfully"
        })
    } catch (error) {
        console.log("Error fetching product: ", error)
        res.status(500).json({
            success: false,
            message: "Error fetching product"
        })
    }
}
//
//
// UPDATE
const updateProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const updatedProduct = req.body; // products from client
        const foundProduct = await Product.findById(id); // products in dtb

        if (!foundProduct)
        {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        // Delete image on cloudinary
        if (updatedProduct.image && (updatedProduct.image !== foundProduct.image))
        {
            console.log('deleting ', foundProduct.image);
            await imageDeleteUtil(foundProduct.image);
        }

        // For each product in updatedProduct, assign value to foundProduct
        // then save foundProduct to dtb
        Object.keys(updatedProduct).forEach(key => {
            foundProduct[key] = updatedProduct[key];
        });
        await foundProduct.save();

        res.status(200).json({
            success: true,
            data: foundProduct,
            message: "Product updated successfully"
        })
    } catch (error) {
        console.log("Error updating product: ", error)
        res.status(500).json({
            success: false,
            message: "Error updating product"
        })
    }
}
//
//
// DELETE
const deleteProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product)
        {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
            return
        }

        await imageDeleteUtil(product.image);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product
        })
    } catch (error) {
        console.log("Error deleting product: ", error)
        res.status(500).json({
            success: false,
            message: "Error deleting product"
        })
    }
}
export {
  handleImageUpload,
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};