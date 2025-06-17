import express from "express";
import {
    getFilteredProducts
} from "../../controllers/customer/products-controller.js";

const router = express.Router();
router.get('/', getFilteredProducts);


export {router as customerProductsRouter}