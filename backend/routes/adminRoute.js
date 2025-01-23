// backend/routes/adminRoute.js
const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  acceptOrder,
  cancelOrder,
  editOrder,
} = require("../controllers/adminController");

// GET /api/admin/orders
router.get("/orders", getAllOrders);

// POST /api/admin/orders/:id/accept
router.post("/orders/:id/accept", acceptOrder);

// POST /api/admin/orders/:id/cancel
router.post("/orders/:id/cancel", cancelOrder);

// PUT /api/admin/orders/:id
router.put("/orders/:id", editOrder);

module.exports = router;
