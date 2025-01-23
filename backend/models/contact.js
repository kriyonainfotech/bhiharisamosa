const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contact = sequelize.define("Contact", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Contact;
