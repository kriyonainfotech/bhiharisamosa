const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cart_db", "root", "MySQL&&100", {
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
