const Portfolio = require('../models/portfolio');
const CashBalance = require('../models/cashBalance');
const { buyStock, sellStock } = require('../services/botService');

exports.getPortfolio = async (req, res) => {
  const portfolio = await Portfolio.findAll();
  const cash = await CashBalance.findOne({ where: { id: 1 } });

  res.json({
    portfolio,
    cash: cash ? cash.balance : 0,
  });
};

exports.buyStock = async (req, res) => {
  const { symbol, price } = req.body;
  await buyStock(symbol, price);
  res.status(200).send(`Bought stock: ${symbol}`);
};

exports.sellStock = async (req, res) => {
  const { symbol, price } = req.body;
  await sellStock(symbol, price);
  res.status(200).send(`Sold stock: ${symbol}`);
};
