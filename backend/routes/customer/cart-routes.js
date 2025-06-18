import express from "express";
import {
  addToCart,
  deleteFromCart,
  getCartItems,
  updateCart,
} from "../../controllers/customer/cart-controller";

const router = express.Router();
router.post('/', addToCart);
router.get('/', getCartItems);
router.put('/', updateCart);
router.delete('/:itemId', deleteFromCart);

export {router as customerProductsRouter}