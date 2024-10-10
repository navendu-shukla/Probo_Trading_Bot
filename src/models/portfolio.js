const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Portfolio = sequelize.define('Portfolio', {
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  avgPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  }
});

module.exports = Portfolio;
