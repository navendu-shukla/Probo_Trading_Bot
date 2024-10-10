// stockService.js

// This object will store the current price of each stock
const stocks = {
  AAPL: 150.00,
  MSFT: 250.00,
  TSLA: 700.00,
  AMZN: 3300.00
};

const oldStockPrices = {
  AAPL: 150.00,
  MSFT: 250.00,
  TSLA: 700.00,
  AMZN: 3300.00
};

// Function to generate a new stock price with up to 10% variance
function fluctuatePrice(symbol) {
  const currentPrice = stocks[symbol];
  const variance = currentPrice * 0.1;  // 10% variance
  const newPrice = currentPrice + (Math.random() - 0.5) * variance;  // Random change within ±10%
  oldStockPrices[symbol] = stocks[symbol];
  stocks[symbol] = Math.max(1, newPrice.toFixed(2));  // Ensure price is at least 1
  console.log("OLD: "+"stock"+symbol+" :"+oldStockPrices[symbol]);
  console.log("NEW: "+"stock"+symbol+" :"+stocks[symbol]);
}

// Function to get current price of a stock
// function getStockPrice(symbol) {
//   return stocks[symbol] ? stocks[symbol].price : null;
// }

// Function to get current price of a stock
function getStockPrices() {
  return stocks;
}

// Function to simulate stock market fluctuations
function simulateStockMarket() {
  setInterval(() => {
    Object.keys(stocks).forEach((symbol) => fluctuatePrice(symbol));
  }, 1000);  // Update prices every second
}

// Start the stock price simulation
simulateStockMarket();

module.exports = {
  getStockPrice,
  getStockPrices
};
