const express = require("express");
const router = express.Router();
const { saveCartInformation } = require("../controllers/cartController");

// Route to save cart information
router.post("/cart-information", saveCartInformation);

module.exports = router;
