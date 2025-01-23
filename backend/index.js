const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const userInfoRoute = require("./routes/userInfoRoute");
const contactRoute = require("./routes/contactRoute");
const cartRoute = require("./routes/cartRoute");

const app = express();
const PORT = 5000;

const corsOptions = {
  origin: ["https://biharisamosa.in", "http://localhost:5000"], // Replace with your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  credentials: true, // Allow cookies and credentials if needed
};

app.use(cors(corsOptions));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/user-info", userInfoRoute);
app.use("/api/contact", contactRoute);
app.use("/api/cart", cartRoute);

// Sync Database and Start Server
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synced successfully!");
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Database sync failed:", err.message);
    process.exit(1);
  });
