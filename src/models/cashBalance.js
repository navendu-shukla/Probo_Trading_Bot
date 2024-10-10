const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CashBalance = sequelize.define('CashBalance', {
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
});

module.exports = CashBalance;
