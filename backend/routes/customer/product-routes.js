import express from "express";
import {
    getFilteredProducts,
    getProductById
} from "../../controllers/customer/products-controller.js";

const router = express.Router();
router.get('/', getFilteredProducts);
router.get('/:id', getProductById);


export {router as customerProductsRouter}