const Portfolio = require("../models/portfolio");
const Trade = require("../models/trades");
const CashBalance = require("../models/cashBalance");

// Fetch cash balance
async function getCashBalanceFromDb() {
    //to update db query in dao layer
    return await CashBalance.findOne({ where: { id: 1 } });
}

async function setCashBalanceToDb() {
    CashBalance.create({ balance: newBalance })
}

async function saveCash() {
    await cash.save();
}

module.exports={
    getCashBalanceFromDb,
    setCashBalanceToDb

}
