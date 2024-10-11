// stockService.js
const {simulateStockMarket} = require( "../config/exchange");
const {stocks,oldStockPrices} = require( "../config/prices");

// Start the stock price simulation
simulateStockMarket();

// Function to get current price of a stock
function getStockPrices() {
  return stocks;
}

function getPreviousStockPrices(){
  return oldStockPrices;
}

module.exports = {
  getStockPrices,
  getPreviousStockPrices
};
