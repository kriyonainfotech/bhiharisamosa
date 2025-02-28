const Order = require("../models/Order");

/**
 * Save order (used by the user site).
 * Expects the request body to contain:
 * {
 *   customer_name,
 *   email_address,
 *   phone_number,
 *   address,
 *   city,
 *   state,
 *   zip_code,
 *   shipping_address,
 *   shipping_city,
 *   shipping_state,
 *   shipping_zip,
 *   cartData: { items: [...], total: 123 },
 *   payment_method
 * }
 */
const saveCartInformation = async (req, res) => {
  try {
    const {
      customer_name,
      email_address,
      phone_number,
      address,
      city,
      state,
      zip_code,
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_zip,
      cartData,
      payment_method,
    } = req.body;

    // Basic validation
    if (
      !customer_name ||
      !email_address ||
      !phone_number ||
      !address ||
      !city ||
      !state ||
      !zip_code ||
      !shipping_address ||
      !shipping_city ||
      !shipping_state ||
      !shipping_zip ||
      !cartData ||
      !Array.isArray(cartData.items) ||
      typeof cartData.total !== "number" ||
      !payment_method
    ) {
      console.log("Validation Failed: Missing or invalid fields in saveCartInformation.");
      return res.status(400).json({ message: "All fields are required and must be valid." });
    }

    // Transform items so each has productName, quantity, price
    const transformedItems = cartData.items.map((item) => ({
      productName: item.productName || item.name || "Unnamed Item",
      quantity: item.quantity || 1,
      price: item.price || 0,
    }));

    // Create a new order in the database
    const order = await Order.create({
      customerName: customer_name,
      emailAddress: email_address,
      phoneNumber: phone_number,
      address,
      city,
      state,
      zipCode: zip_code,
      shippingAddress: shipping_address,
      shippingCity: shipping_city,
      shippingState: shipping_state,
      shippingZip: shipping_zip,
      orderDetails: transformedItems,
      shippingCharge: cartData.shipping || 40,
      totalAmount: cartData.total,
      paymentMethod: payment_method,
      status: "Pending",
    });

    console.log("Order Saved Successfully:", order.toJSON());
    return res.status(201).json({ message: "Order saved successfully!", order });
  } catch (error) {
    console.error("Error saving order:", error.message);
    return res.status(500).json({ message: "Failed to save order." });
  }
};

/**
 * Fetch orders for the admin panel.
 * Optionally filtered by status (e.g., ?status=Pending).
 */
const getAllOrders = async (req, res) => {
  try {
    const { status } = req.query;
    let orders;

    if (status) {
      console.log(`Fetching orders with status: ${status}`);
      orders = await Order.findAll({ where: { status } });
    } else {
      console.log("Fetching all orders (no status filter).");
      orders = await Order.findAll();
    }

    console.log(`Found ${orders.length} orders.`);
    return res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    return res.status(500).json({ message: "Failed to fetch orders." });
  }
};

/**
 * Accept an order (only if status is "Pending").
 * Endpoint: POST /api/cart/all-orders/:id/accept
 * Changes order status to "Completed".
 */
const acceptOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(`Accepting order ID: ${orderId}`);

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Only pending orders can be accepted" });
    }

    order.status = "Completed";
    await order.save();

    console.log(`Order ${orderId} accepted and marked as completed successfully.`);
    return res.json({ message: "Order accepted and marked as completed", order });
  } catch (error) {
    console.error("Error accepting order:", error.message);
    return res.status(500).json({ message: "Failed to accept order." });
  }
};

/**
 * Cancel an order (only if status is "Pending").
 * Endpoint: POST /api/cart/all-orders/:id/cancel
 * Changes order status to "Cancelled".
 */
const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(`Cancelling order ID: ${orderId}`);

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    // Instead of deleting, update the status to "Cancelled"
    order.status = "Cancelled";
    await order.save();

    console.log(`Order ${orderId} cancelled successfully.`);
    return res.json({ message: "Order cancelled successfully", order });
  } catch (error) {
    console.error("Error cancelling order:", error.message);
    return res.status(500).json({ message: "Failed to cancel order." });
  }
};

/**
 * Update order details.
 * Endpoint: PUT /api/cart/all-orders/:id
 * For example, update the customerName.
 */
const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { customerName } = req.body;
    console.log(`Updating order ID: ${orderId} with new customerName: ${customerName}`);

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (!customerName) {
      return res.status(400).json({ message: "customerName is required for update." });
    }

    order.customerName = customerName;
    await order.save();

    console.log(`Order ${orderId} updated successfully.`);
    return res.json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error.message);
    return res.status(500).json({ message: "Failed to update order." });
  }
};

/**
 * Delete an order.
 * Endpoint: DELETE /api/cart/all-orders/:id
 */
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log(`Deleting order ID: ${orderId}`);

    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    console.log(`Order ${orderId} deleted successfully.`);
    return res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error.message);
    return res.status(500).json({ message: "Failed to delete order." });
  }
};

module.exports = {
  saveCartInformation,
  getAllOrders,
  acceptOrder,
  cancelOrder,
  updateOrder,
  deleteOrder,
};
