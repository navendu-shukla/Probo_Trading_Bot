// stockService.js
const {simulateStockMarket} = require( "../config/exchange");
const {stocks} = require( "../config/prices");

// Start the stock price simulation
simulateStockMarket();

// Function to get current price of a stock
function getStockPrices() {
  return stocks;
}

module.exports = {
  getStockPrices,
};
