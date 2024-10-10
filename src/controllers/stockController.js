// stockController.js
const { getStockPrice } = require('../services/stockService');

// Fetch current price for a specific stock symbol
exports.getStockPrice = (req, res) => {
  const symbol = req.params.symbol.toUpperCase();
  const price = getStockPrice(symbol);

  if (price !== null) {
    res.json({ symbol, price });
  } else {
    res.status(404).json({ message: `Stock symbol ${symbol} not found` });
  }
};

// Fetch all stock prices
exports.getAllStockPrices = (req, res) => {
  res.json(require('../services/stockService').stocks);
};
