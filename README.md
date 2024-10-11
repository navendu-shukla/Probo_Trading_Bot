# TRADING BOT

## Overview

This is a backend application on Node.js, that simulates a basic trading bot for a hypothetical stock market. 

## Features

- Trading based on moving average crossover

## Prerequisites

Before getting started, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- VSCode

## Getting Started

### Import the Repository

Import this repository to your local machine:
- clone the repo

### Install dependencies
- run `npm install` on this folder location to import all the dependencies
- create a db on mysl


## Running application by following below two steps
- run `node src/initDb.js`
- run `node src/index.js`

## Stock Price changes
- To mock stock proces stockServices.js file is added which generates new stock prices for the pre-defined stocks (present in src/config/prices)
- The price changes can be viewed at `http://localhost:3000/api/stocks/prices`

## Portfolio
- Portfolio is updated whenever we buy or sell a stock
- Portfolio can be viewed at `http://localhost:3000/api/bot/portfolio`

## Trading logic
- Added trading logic for moving average crossover



