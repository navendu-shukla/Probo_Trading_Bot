//to update below two lines into index.js in router folder
const express = require('express');
const router = express.Router();

//import changes required
const { getPortfolio, buyStockByBot, sellStockByBot } = require('../controllers/botController');


router.get('/portfolio', getPortfolio);
router.post('/buy', buyStockByBot);
router.post('/sell', sellStockByBot);


module.exports = router;
