// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");

// Import routes (यदि userInfoRoute/contactRoute मौजूद हों तो, अन्यथा इन्हें हटा सकते हैं)
const userInfoRoute = require("./routes/userInfoRoute"); // optional
const contactRoute = require("./routes/contactRoute"); // optional
const cartRoute = require("./routes/cartRoute");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use("/api/user-info", userInfoRoute);
app.use("/api/contact", contactRoute);
app.use("/api/cart", cartRoute);

// Sync Database and Start Server
sequelize
  .sync({ alter: true }) // विकास के दौरान, alter:true tables को अपडेट करता है बिना डेटा खोए
  .then(async () => {
    console.log("Database synced successfully!");

    // Dummy order insert करें (यदि हर बार dummy order insert नहीं करना है तो इसे comment कर दें)
    const { Order } = require("./models");
    await Order.create({
      customerName: "Test User",
      emailAddress: "test@example.com",
      phoneNumber: "1234567890",
      address: "123 Main St",
      city: "Test City",
      state: "Test State",
      zipCode: "12345",
      shippingAddress: "123 Main St",
      shippingCity: "Test City",
      shippingState: "Test State",
      shippingZip: "12345",
      orderDetails: [
        { productName: "Test Product 1", quantity: 2, price: 100 },
        { productName: "Test Product 2", quantity: 1, price: 50 },
      ],
      shippingCharge: 40,
      totalAmount: 290, // (2 * 100) + (1 * 50) + 40
      paymentMethod: "online",
      status: "Pending",
    });
    console.log("Dummy order inserted.");

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Database sync failed:", err.message);
    process.exit(1);
  });
