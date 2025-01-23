const express = require("express");
const router = express.Router();
const { saveContactForm } = require("../controllers/contactController"); // Correctly import the function

// Define the POST route
router.post("/contact", saveContactForm); // Properly reference the function

module.exports = router;
