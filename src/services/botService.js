const Portfolio = require("../models/portfolio");
const Trade = require("../models/trades");
const CashBalance = require("../models/cashBalance");
const stockService = require("./stockService");
const { NUMBER } = require("sequelize");
const { getCashBalanceFromDb, setCashBalanceToDb } = require("../dao/botDao");

const priceHistory = {
  AAPL: [],
  MSFT: [],
  TSLA: [],
  AMZN: [],
};

// Fetch cash balance
async function getCashBalance() {
  //to update db query in dao layer
  const cash = await getCashBalanceFromDb();
  return cash ? Number(cash.balance) : 0;
}

// Update cash balance
async function updateCashBalance(newBalance) {
  console.log(`New Balance : ${newBalance}`)
  const cash = await getCashBalanceFromDb();
  if (cash) {
    cash.balance = newBalance;
    await cash.save();
  } else {
    await setCashBalanceToDb();
  }
}


// sort krdo bhaiya
// Buy stock and update portfolio
async function buyStock(symbol, price) {
  console.log("buyStock is called");
  let cash = await getCashBalance();
  const quantity = Math.floor(cash / price)<5?Math.floor(cash / price):5;
  console.log(`quantity ${quantity}`);
  console.log(`cash ${cash}`);

  if (quantity > 0) {
    cash -= (quantity * price).toFixed(2);
    await updateCashBalance(cash);

    // Check if stock is already in portfolio
    const portfolioItem = await Portfolio.findOne({ where: { symbol } });

    if (portfolioItem) {
      //to create new method for get newAvgPrice for below line
      const newAvgPrice =
        (portfolioItem.avgPrice * portfolioItem.quantity + quantity * price) /
        (portfolioItem.quantity + quantity);
      portfolioItem.quantity += quantity;
      portfolioItem.avgPrice = newAvgPrice;
      await portfolioItem.save();
    } else {
      await Portfolio.create({ symbol, quantity, avgPrice: price });
    }

    // Log the trade
    await Trade.create({ symbol, tradeType: "BUY", quantity, price });
    console.log(`Bought ${quantity} shares of ${symbol} at ${price}`);
  }
}

// Sell stock and update portfolio
async function sellStock(symbol, price) {
  console.log("sellStock is called");
  const portfolioItem = await Portfolio.findOne({ where: { symbol } });
  console.log(`portfolio ${portfolioItem}`);

  if (portfolioItem) {
    const quantity = portfolioItem.quantity;
    let cash = await getCashBalance();
    cash += Number((quantity * price).toFixed(2)); //add comment
    await updateCashBalance(cash);

    await portfolioItem.destroy(); // Remove stock from portfolio after selling

    // Log the trade
    await Trade.create({ symbol, tradeType: "SELL", quantity, price });
    console.log(`Sold ${quantity} shares of ${symbol} at ${price}`);
  }
}

// async function tradeStocks() {
//   const stockPrices = stockService.getStockPrice('AAPL');
// }

function calculateMovingAverage(prices, period) {
  const sum = prices.slice(-period).reduce((acc, price) => acc + price, 0); //is '-' required
  console.log(sum / period);
  return Number((sum / period).toFixed(2)); //import check return type
}

function tradeBasedOnMovingAverage() {
  const prices = stockService.getStockPrices();
  // console.log("##########################: "+JSON.stringify(prices));
  Object.keys(prices).forEach(async (symbol) => {
    const price = prices[symbol];
    // console.log("##########################: "+price);
    // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@: "+symbol);
    // Keep track of price history for each stock
    priceHistory[symbol].push(price);

    if (priceHistory[symbol].length >= 20) { // TODO add constant for the moving avg limit
      // Calculate short-term (5-period) and long-term (20-period) moving averages
      const shortTermMA = calculateMovingAverage(priceHistory[symbol], 5);
      const longTermMA = calculateMovingAverage(priceHistory[symbol], 20);

      // Generate buy/sell signals based on moving averages
      if (shortTermMA > longTermMA) {
        // Buy signal
        await buyStock(symbol, price);
      } else if (shortTermMA < longTermMA) {
        // Sell signal
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
  const { updatedStockPrices, prevStockPrices } = stockService.getStockPrices();

  Object.keys(updatedStockPrices).forEach((stock) => {
    const price = updatedStockPrices[stock];
    console.log(stock);
    console.log(`updated: ${updatedStockPrices[stock]}`);
    console.log(`previous: ${prevStockPrices[stock]}`);
    if (!portfolio[stock] && price <= prevStockPrices[stock] * 0.95) {
      // Buy if price drops by 5%
      buyStock(stock, price);
    } else if (portfolio[stock] && price >= portfolio[stock].avgPrice * 1.1) {
      // Sell if price rises by 10%
      sellStock(stock, price);
    }
  });
}

// Execute trading logic every 2 seconds
setInterval(tradeBasedOnMovingAverage, 2000);

module.exports = {
  buyStock,
  sellStock,
  getCashBalance,
  tradeBasedOnMovingAverage,
};
