const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');


// Load environment variables
dotenv.config();

const stockRoutes = require('./routes/stockRoutes');
const botRoutes = require('./routes/botRoutes');
// const Portfolio = require('./models/portfolio');
// const Trade = require('./models/trades');
// const CashBalance = require('./models/cashBalance');


const app = express();
// const PORT = process.env.PORT || 3000;

// Middleware for JSON parsing
app.use(express.json());

// Sync Sequelize models to create tables
// sequelize.sync({ force: false })  // Use `force: true` to reset tables
//   .then(() => console.log('Database synced'))
//   .catch((err) => console.error('Error syncing database:', err));

  
// Routes
app.use('/api/stocks', stockRoutes); // Routes for stock prices
app.use('/api/bot', botRoutes);       // Routes for trading bot

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
module.exports = app
 

// default app;