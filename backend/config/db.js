// config/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cart_db", "root", "Password@123", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully!"))
  .catch((error) =>
    console.error("Database connection failed:", error.message)
  );

module.exports = sequelize;
