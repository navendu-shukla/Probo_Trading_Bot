const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const stockRoutes = require('./routes/stockRoutes');
const botRoutes = require('./routes/botRoutes');

// Load environment variables
dotenv.config();
const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Routes
app.use('/api/stocks', stockRoutes); // Routes for stock prices
app.use('/api/bot', botRoutes);       // Routes for trading bot

module.exports = app