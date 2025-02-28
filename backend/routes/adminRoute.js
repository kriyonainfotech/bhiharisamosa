// routes/adminRoute.js
import express from "express";
import { getAllOrders, acceptOrder, cancelOrder, editOrder } from "../controllers/adminController.js";

const router = express.Router();

router.get("/orders", getAllOrders);
router.post("/orders/:id/accept", acceptOrder);
router.post("/orders/:id/cancel", cancelOrder);
router.put("/orders/:id", editOrder);

export default router;
