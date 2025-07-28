import Order from "../../models/Order.js";
import { Address } from "../../models/Address.js";

// Helper
const formatOrder = (orderDoc) => {
  const obj = orderDoc.toObject();
  obj.user = obj.userId;
  obj.address = obj.addressId;
  delete obj.userId;
  delete obj.addressId;
  return obj;
};

// [CREATE]
const createOrder = async (req, res) => {
  try {
    const { userId, items, addressId, totalPrice, notes } = req.body;
    //
    // Validate required fields
    if (!userId || !Array.isArray(items) || items.length === 0 || !addressId || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields"
      });
    }
    //
    // Validate address
    const address = await Address.findById(addressId);
    if (!address || address.userId.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid or unauthorized address"
      });
    }
    //
    // Create and save order
    const order = new Order({ userId, addressId, items, totalPrice, notes });
    await order.save();
    await order.populate("items.product");
    await order.populate("addressId");
    //
    // Format order
    const resOrder = formatOrder(order);
    //
    // Success
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: resOrder
    });

  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({
      success: false,
      message: "Error placing order"
    });
  }
};

// [GET] all
const getAllOrders = async (req, res) => {
  try {
    const rawOrders = await Order.find({})
      .populate("userId", "userName email")
      .populate("items.product")
      .populate("addressId");
    //
    // Format orders
    const orders = rawOrders.map(formatOrder);
    //
    // Success
    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      data: orders
    });

  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders"
    });
  }
};

// [GET] by user
const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    //
    // Validate
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing user ID"
      });
    }
    //
    // Find orders by userId
    const rawOrders = await Order.find({ userId })
      .populate("userId", "userName email")
      .populate("items.product")
      .populate("addressId");
    //
    // Format orders
    const orders = rawOrders.map(formatOrder);
    //
    // Success
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders
    });

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders"
    });
  }
};

// [PUT]
const setOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.params;
    //
    // Validate
    const allowedStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value"
      });
    }
    //
    // Find orders by id
    const order = await Order.findById(orderId)
      .populate("userId", "userName email")
      .populate("items.product")
      .populate("addressId");
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }
    //
    // Set status
    order.status = status;
    await order.save();
    //
    // Format order
    const resOrder = formatOrder(order);
    //
    // Success
    res.status(200).json({
      success: true,
      message: `Order status updated to '${status}'`,
      data: resOrder
    });

  } catch (error) {
    console.error("Failed to update order status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating status"
    });
  }
};

export { createOrder, getOrdersByUser, getAllOrders, setOrderStatus };