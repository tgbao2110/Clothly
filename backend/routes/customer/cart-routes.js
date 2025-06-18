import express from "express";
import {
  addToCart,
  deleteFromCart,
  getCartItems,
  updateCart,
} from "../../controllers/customer/cart-controller.js";

const router = express.Router();
router.post('/', addToCart);
router.get('/:userId', getCartItems);
router.put('/', updateCart);
router.delete('/:userId/:productId', deleteFromCart);

export {router as cartRouter}