const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserInfo = sequelize.define("UserInfo", {
  email_address: { type: DataTypes.STRING, allowNull: false },
  phone_number: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  state: { type: DataTypes.STRING, allowNull: false },
  zip_code: { type: DataTypes.STRING, allowNull: false },
  shipping_address: { type: DataTypes.STRING, allowNull: false },
  shipping_city: { type: DataTypes.STRING, allowNull: false },
  shipping_state: { type: DataTypes.STRING, allowNull: false },
  shipping_zip: { type: DataTypes.STRING, allowNull: false },
  orderTotal: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = UserInfo;
