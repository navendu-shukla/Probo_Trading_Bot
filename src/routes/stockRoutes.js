// stockRoutes.js
//to update below two lines into index.js in router folder
const express = require('express');
const router = express.Router();

const { getStockPrice, getAllStockPrices } = require('../controllers/stockController');



// Route to get all stock prices
router.get('/prices', getAllStockPrices);

// Route to get the price of a specific stock
router.get('/prices/:symbol', getStockPrice);

module.exports = router;
