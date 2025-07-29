// routes/customer/order-router.js

import express from "express";
import {
  createOrder,
  getOrdersByUser,
  getAllOrders,
  setOrderStatus
} from "../../controllers/order/order-controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/all", getAllOrders);
router.get("/:userId", getOrdersByUser);
router.put("/:orderId/:status", setOrderStatus);

export { router as orderRouter };