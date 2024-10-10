const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const app = require('./app');

// Load environment variables from .env file
dotenv.config();

// Function to start the server
const startServer = async () => {
  try {
    // Test the connection to the database
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');

    // Sync Sequelize models to create tables in the database
    await sequelize.sync({ force: false });  // Change to true if you need to reset tables
    console.log('Database synced successfully.');

    // Start the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Start the server
startServer();
