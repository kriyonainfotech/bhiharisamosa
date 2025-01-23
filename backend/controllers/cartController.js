const Order = require("../models/Order");

const saveCartInformation = async (req, res) => {
  try {
    const {
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

    // Validate data
    if (
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
      !cartData.items ||
      !cartData.total ||
      !payment_method
    ) {
      console.log("Validation Failed: Missing Fields");
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save order to database
    const order = await Order.create({
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
      order_details: cartData.items,
      shipping_charge: cartData.shipping,
      total_amount: cartData.total,
      payment_method,
    });

    console.log("Order Saved Successfully:", order);
    res.status(201).json({ message: "Order saved successfully!", order });
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ message: "Failed to save order." });
  }
};

module.exports = { saveCartInformation };
