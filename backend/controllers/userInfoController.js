const UserInfo = require("../models/userInfo");
const Order = require("../models/Order");

const saveUserInfoAndOrder = async (req, res) => {
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
    orderTotal,
    orderDetails, // Include order details from the request
    paymentMethod,
  } = req.body;

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
    orderTotal == null ||
    !orderDetails ||
    !paymentMethod
  ) {
    return res
      .status(400)
      .json({ message: "All fields including order details and payment method are required." });
  }

  try {
    // Save UserInfo
    const userInfo = await UserInfo.create({
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
      orderTotal,
    });

    // Save Order
    const order = await Order.create({
      userId: userInfo.id, // Link order to the user
      orderDetails,
      shippingCharge: 40, // Fixed shipping charge
      totalAmount: orderTotal,
      paymentMethod,
    });

    res
      .status(201)
      .json({ message: "Order and user info saved successfully!", userInfo, order });
  } catch (err) {
    console.error("Error saving data:", err.message);
    res.status(500).json({ message: "Error saving data", error: err.message });
  }
};

module.exports = { saveUserInfoAndOrder };
