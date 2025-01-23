// models/Order.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  // Contact & Shipping Info
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zip_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipping_zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // Order Details
  order_details: {
    // Typically an array of items, so store as JSON
    type: DataTypes.JSON,
    allowNull: false,
  },
  shipping_charge: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 40,
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // NEW: Track order status (Pending, Accepted, or Cancelled, etc.)
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending", 
    // Admin can set to "Accepted" or "Cancelled" if they wish
  },
});

module.exports = Order;
