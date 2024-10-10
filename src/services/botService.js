const Portfolio = require('../models/portfolio');
const Trade = require('../models/trades');
const CashBalance = require('../models/cashBalance');
const stockService = require('./stockService');
const { NUMBER } = require('sequelize');

const priceHistory = {
  AAPL: [],
  MSFT: [],
  TSLA: [],
  AMZN: []
};


// Fetch cash balance
async function getCashBalance() {
  const cash = await CashBalance.findOne({ where: { id: 1 } });
  return cash ? Number(cash.balance) : 0;
}

// Update cash balance  
async function updateCashBalance(newBalance) {
  const cash = await CashBalance.findOne({ where: { id: 1 } });
  if (cash) {
    cash.balance = newBalance;
    await cash.save();
  } else {
    await CashBalance.create({ balance: newBalance });
  }
}

// Buy stock and update portfolio
async function buyStock(symbol, price) {
  console.log("buyStock is called");
  let cash = await getCashBalance();
  const quantity = Math.floor(cash / price);
  console.log(`quantity ${quantity}`)

  if (quantity > 0) {
    cash -= (quantity * price).toFixed(2);
    await updateCashBalance(cash);

    // Check if stock is already in portfolio
    const portfolioItem = await Portfolio.findOne({ where: { symbol } });

    if (portfolioItem) {
      const newAvgPrice = ((portfolioItem.avgPrice * portfolioItem.quantity) + (quantity * price)) / (portfolioItem.quantity + quantity);
      portfolioItem.quantity += quantity;
      portfolioItem.avgPrice = newAvgPrice;
      await portfolioItem.save();
    } else {
      await Portfolio.create({ symbol, quantity, avgPrice: price });
    }

    // Log the trade
    await Trade.create({ symbol, tradeType: 'BUY', quantity, price });
    console.log(`Bought ${quantity} shares of ${symbol} at ${price}`);
  }
}

// Sell stock and update portfolio
async function sellStock(symbol, price) {
  console.log("sellStock is called")
  const portfolioItem = await Portfolio.findOne({ where: { symbol } });
  console.log(`portfolio ${portfolioItem}`)

  if (portfolioItem) {
    const quantity = portfolioItem.quantity;
    let cash = await getCashBalance();
    console.log(`cash1 ${cash}`,typeof(cash))
    console.log(`quantity ${quantity}`,typeof(quantity))
    console.log(`price ${price}`,typeof(price))
    cash += Number((quantity * price).toFixed(2));
    console.log(`cash2 ${cash}`)
    await updateCashBalance(cash);

    await portfolioItem.destroy();  // Remove stock from portfolio after selling

    // Log the trade
    await Trade.create({ symbol, tradeType: 'SELL', quantity, price });
    console.log(`Sold ${quantity} shares of ${symbol} at ${price}`);
  }
}

// async function tradeStocks() {
//   const stockPrices = stockService.getStockPrice('AAPL');
// }

function calculateMovingAverage(prices, period) {
  const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0);
  console.log(sum / period);
  return (sum / period).toFixed(2);
}

function tradeBasedOnMovingAverage() {
  // console.log("tradeBasedOnMovingAverage is called")
  const prices = stockService.getStockPrices();

  Object.keys(prices).forEach(async (symbol) => {
    const price = prices[symbol];
    // console.log(price);

    // Keep track of price history for each stock
    priceHistory[symbol].push(price);
    // console.log(priceHistory[symbol]);
    // console.log(`PriceHistory: ${priceHistory}`)

    if (priceHistory[symbol].length >= 20) {
      // Calculate short-term (5-period) and long-term (20-period) moving averages
      const shortTermMA = calculateMovingAverage(priceHistory[symbol], 5);
      const longTermMA = calculateMovingAverage(priceHistory[symbol], 20);

      // Generate buy/sell signals based on moving averages
      if (shortTermMA > longTermMA) {
        // Buy signal
      // console.log(`buy signal`)
        
        await buyStock(symbol, price);
      } else if (shortTermMA < longTermMA) {
        // Sell signal
        // console.log(`sell signal`)
        await sellStock(symbol, price);
      }
    }

    // Limit the length of price history to 20 periods
    if (priceHistory[symbol].length > 20) {
      priceHistory[symbol].shift();
    }
  });
}

function tradeStocks() {
  const {updatedStockPrices,prevStockPrices} = stockService.getStockPrices();

  Object.keys(updatedStockPrices).forEach(stock => {
    const price = updatedStockPrices[stock];
    console.log(stock);
    console.log(`updated: ${updatedStockPrices[stock]}`);
    console.log(`previous: ${prevStockPrices[stock]}`);
    if (!portfolio[stock] && price <= prevStockPrices[stock] * 0.95) {
      // Buy if price drops by 5%
      buyStock(stock, price);
    } else if (portfolio[stock] && price >= portfolio[stock].avgPrice * 1.10) {
      // Sell if price rises by 10%
      sellStock(stock, price);
    }
  });
}

// Execute trading logic every 2 seconds
// setInterval(tradeBasedOnMovingAverage, 2000);

module.exports = {
  buyStock,
  sellStock,
  getCashBalance,
  tradeBasedOnMovingAverage
};
