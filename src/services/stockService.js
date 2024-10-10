// stockService.js
import { simulateStockMarket } from "../config/exchange";
import { stocks, oldStockPrices } from "../config/prices";

// Start the stock price simulation
simulateStockMarket();

// Function to get current price of a stock
function getStockPrices() {
  return stocks;
}

module.exports = {
  getStockPrices,
};
