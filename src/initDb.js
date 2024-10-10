// initDb.js
const sequelize = require('./config/database');
const Portfolio = require('./models/portfolio');
const Trade = require('./models/trades');
const CashBalance = require('./models/cashBalance');

const initDatabase = async () => {
    try {
        // Sync the database (create the tables if they don't exist)
        await sequelize.sync({ force: true }); // Use force: true to drop tables if they already exist
        console.log('Database synchronized');

        // Create initial balance
        await CashBalance.create({ balance: 100000 });
        console.log('Initial data inserted');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await sequelize.close();
    }
};

initDatabase();
