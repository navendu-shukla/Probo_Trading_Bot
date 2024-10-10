// This object will store the current price of each stock
const stocks = {
    AAPL: 150.00,
    MSFT: 250.00,
    TSLA: 700.00,
    AMZN: 3300.00
};

const oldStockPrices = {...stocks};

module.exports = {
    stocks,
    oldStockPrices
}


