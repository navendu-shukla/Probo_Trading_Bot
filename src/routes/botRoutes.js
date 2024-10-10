const express = require('express');
const { getPortfolio, buyStock, sellStock } = require('../controllers/botController');

const router = express.Router();

router.get('/portfolio', getPortfolio);
router.post('/buy', buyStock);
router.post('/sell', sellStock);


module.exports = router;
