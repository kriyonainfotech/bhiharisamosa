// controllers/adminController.js
import { Order } from "../models/index.js";

/**
 * Get all orders.
 * Optionally, filter orders by status using a query parameter (e.g., ?status=Pending).
 */
export const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const orders = status
      ? await Order.findAll({ where: { status } })
      : await Order.findAll();
    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
};

/**
 * Accept an order.
 * Only orders with "Pending" status can be accepted.
 * When accepted, the order status is updated to "Completed".
 * Endpoint: POST /api/admin/orders/:id/accept
 */
export const acceptOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.status !== "Pending") {
      return res.status(400).json({ error: "Only pending orders can be accepted" });
    }
    order.status = "Completed"; // Update status to Completed
    await order.save();
    return res.json({ message: "Order accepted and marked as completed", order });
  } catch (error) {
    console.error("Error accepting order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Cancel an order.
 * Only orders with "Pending" status can be cancelled.
 * Instead of simply updating the status, the order is deleted from the database.
 * Endpoint: POST /api/admin/orders/:id/cancel
 */
export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.status !== "Pending") {
      return res.status(400).json({ error: "Only pending orders can be cancelled" });
    }
    // Delete the order from the database
    await order.destroy();
    return res.json({ message: "Order cancelled and deleted" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Edit an order.
 * Updates the order details with the provided data.
 * Endpoint: PUT /api/admin/orders/:id
 */
export const editOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    Object.assign(order, req.body);
    await order.save();
    return res.json({ message: "Order updated", order });
  } catch (error) {
    console.error("Error updating order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
