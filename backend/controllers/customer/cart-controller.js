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
        const existingItem = cart.items.find(item => item.product.toString() === productId)
        //// if item exists dtb qty += req qty
        if(existingItem)
            existingItem.qty += Number(qty);
        //// else push req item to dtb item
        else
            cart.items.push({product: productId,qty})
        //
        //
        await cart.save();
        await cart.populate("items.product");
        res.status(200).json({
            success: true,
            message: 'Added to cart',
            data: cart.items
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
        const cart = await Cart.findOne({ userId }).populate("items.product");
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

const updateCart = async (req, res) => {
  try {
    const { userId, items } = req.body;
    //
    // Basic validation
    if (!userId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid request payload",
      });
    }
    //
    // Get cart in dtb
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    //
    // Validate all items: each must have product._id and valid qty
    const validatedItems = items.filter((item) => {
      return (
        item?.product?._id &&
        typeof item.qty === "number" &&
        item.qty >= 1
      );
    });
    //
    if (validatedItems.length !== items.length) {
      return res.status(400).json({
        success: false,
        message: "Some items are invalid or missing required fields",
      });
    }
    //
    // Replace cart items with validated ones
    cart.items = validatedItems;
    await cart.save();
    //
    await cart.populate("items.product")
    //
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cart.items,
    });
  } catch (error) {
    console.error("Cart update failed:", error);
    res.status(500).json({
      success: false,
      message: "Error updating cart",
    });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Missing user or product ID"
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const originalCount = cart.items.length;
    cart.items = cart.items.filter(item => item.product.toString() !== productId);

    if (cart.items.length === originalCount) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart"
      });
    }

    await cart.save();

    cart = await Cart.findOne({ userId }).populate("items.product")
    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: cart.items
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error removing item from cart"
    });
  }
};

const deleteAllItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing user ID"
      });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: "All items removed from cart",
      data: []
    });

  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove all items from cart"
    });
  }
};

export { addToCart, getCartItems, updateCart, deleteFromCart, deleteAllItems }