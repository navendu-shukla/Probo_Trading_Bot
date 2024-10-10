// stockRoutes.js
const express = require('express');
const { getStockPrice, getAllStockPrices } = require('../controllers/stockController');

const router = express.Router();

// Route to get all stock prices
router.get('/prices', getAllStockPrices);

// Route to get the price of a specific stock
router.get('/prices/:symbol', getStockPrice);

module.exports = router;
