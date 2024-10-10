const {stocks, oldStockPrices} =  require("./prices");
const {logger} = require("../utils/logger");

// const VARIANCE_FACTOR = Math.random() - 0.5; //to generate decimal value ranging from -0.5 to 0.5
const STOCK_VARIANCE_INTERVAL = 1000; //To Update price every second

// Function to generate a new stock price with up to 10% variance
function fluctuatePrice(symbol) {
  const currentPrice = stocks[symbol];
  const variance = currentPrice * 0.1; // 10% variance
  const newPrice = currentPrice + (Math.random() - 0.5) * variance;  // Random change within ±10%
  oldStockPrices[symbol] = stocks[symbol];
  stocks[symbol] = Math.max(1, newPrice.toFixed(2)); // Ensure price is at least 1

  logger("OLD: " + "stock" + symbol + " :" + oldStockPrices[symbol]);
  logger("NEW: " + "stock" + symbol + " :" + stocks[symbol]);
}

// Function to simulate stock market fluctuations
function simulateStockMarket() {
  setInterval(() => {
    Object.keys(stocks).forEach((symbol) => fluctuatePrice(symbol));
  }, STOCK_VARIANCE_INTERVAL); // Update prices every second
}

module.exports = {
  simulateStockMarket
}
