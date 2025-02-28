// routes/cartRoute.js
const express = require("express");
const router = express.Router();

const {
  saveCartInformation,
  getAllOrders,
  acceptOrder,
  cancelOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/cartController");

// POST: Save order from the user site
router.post("/cart-information", saveCartInformation);

// GET: Fetch orders for the admin panel
// Example: GET /api/cart/all-orders?status=Pending
router.get("/all-orders", getAllOrders);

// POST: Accept an order (only if status is "Pending")
// Endpoint: /api/cart/all-orders/:id/accept
router.post("/all-orders/:id/accept", acceptOrder);

// POST: Cancel an order (only if status is "Pending")
// Endpoint: /api/cart/all-orders/:id/cancel
router.post("/all-orders/:id/cancel", cancelOrder);

// PUT: Update an order (उदाहरण: customerName update करना)
// Endpoint: /api/cart/all-orders/:id
router.put("/all-orders/:id", updateOrder);

// DELETE: Delete an order
// Endpoint: /api/cart/all-orders/:id
router.delete("/all-orders/:id", deleteOrder);

module.exports = router;
