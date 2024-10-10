import { Portfolio } from  '../models/portfolio';
import {CashBalance} from '../models/cashBalance';
import { buyStock, sellStock } from '../services/botService';

export const getPortfolio = async (req, res) => {
  const portfolio = await Portfolio.findAll();
  const cash = await CashBalance.findOne({ where: { id: 1 } });

  res.json({
    portfolio,
    cash: cash ? cash.balance : 0,
  });
};

export const buyStock = async (req, res) => {
  const { symbol, price } = req.body;
  await buyStock(symbol, price);
  res.status(200).send(`Bought stock: ${symbol}`);
};

export const sellStock = async (req, res) => {
  const { symbol, price } = req.body;
  await sellStock(symbol, price);
  res.status(200).send(`Sold stock: ${symbol}`);
};


