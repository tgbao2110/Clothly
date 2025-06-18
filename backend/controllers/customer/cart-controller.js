import Cart from "../../models/Cart.js";
import {Product} from "../../models/Product.js"

const addToCart = async(req, res) => {
    try {
        const {userId, productId, qty} = req.body;
        //
        // Validate request
        if (!userId)
            return res.status(400).json({
                success: false,
                message: 'Invalid user. Try logging in'
            })
        if (!productId)
            return res.status(400).json({
                success: false,
                message: 'Product not found'
            })
        if (!qty)
            return res.status(400).json({
                success: false,
                message: 'Invalid quantity. Try adding at least one product'
            })
        //
        // Check if product exist in dtb
        const product = await Product.findById(productId);
        if (!product)
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        //
        // Get cart or create new if not existing
        let cart = await Cart.findOne({userId});
        if(!cart) {
            cart = new Cart({userId, items: []})
        }
        //
        // Add item to dtb
        const existingItem = cart.items.find(item => item.productId.toString() === productId)
        //// if item exists dtb qty += req qty
        if(existingItem)
            existingItem.qty += Number(qty);
        //// else push req item to dtb item
        else
            cart.items.push({productId,qty})
        //
        //
        await cart.save();
        res.status(200).json({
            success: true,
            message: 'Added to cart',
            data: cart 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error adding to cart'
        })
    }
}

const getCartItems = async(req, res) => {
    try {
        const {userId} = req.params
        if(!userId) {
            return res.status(400).json({
                success: false,
                message: 'Invalid user. Try logging in'
            })
        }
        //
        const cart = await Cart.findOne({userId}).populate("items.productId");
        //
        if(!cart || cart.items.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'Cart is empty',
                data: []
            })
        }
        //
        //
        res.status(200).json({
            success: true,
            message: 'Cart items fetched successfully',
            data: cart.items
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching cart items'
        })
    }
}

const updateCart = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error adding to cart'
        })
    }
}

const deleteFromCart = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error adding to cart'
        })
    }
}

export { addToCart, getCartItems, updateCart, deleteFromCart }