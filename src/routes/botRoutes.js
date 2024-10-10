//to update below two lines into index.js in router folder
const express = require('express');
const router = express.Router();

//import changes required
const { getPortfolio, buyStock, sellStock } = require('../controllers/botController');


router.get('/portfolio', getPortfolio);
router.post('/buy', buyStock);
router.post('/sell', sellStock);


module.exports = router;
