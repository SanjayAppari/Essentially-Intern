const fs = require('fs');

const stocksFile = 'stocksData.json';
let stocksData = [];

const fetchStocks = async () => {
  try {
    const response = await fetch('https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-04-14?adjusted=true&sort=asc&limit=20&apiKey=UqyAhgLrUEqdNcAGUKFlGlp2t0Ew7kJU');
    const data = await response.json();

    const stocks = data.results.map((stock) => ({
      symbol: stock.v,
      openPrice: stock.o,
      refreshInterval: Math.floor(Math.random() * (5)) + 1, 
      lastUpdateTime: Date.now(),
    }));

    stocksData = stocks;
    saveStocksToFile();
  } catch (error) {
    console.error('Error fetching stocks:', error);
  }
};

const updateStockPrices = () => {
    const currentTime = Date.now();

    stocksData.forEach((stock) => {
      if (currentTime - stock.lastUpdateTime >= stock.refreshInterval * 1000) {
        stock.price = stock.openPrice + (Math.random() * 10 - 5);
        stock.lastUpdateTime = currentTime;
      }
    });
    saveStocksToFile();
};

const getStockPrices = () => {
    const fileData = fs.readFileSync(stocksFile, 'utf-8');
    stocksData = JSON.parse(fileData);
    return stocksData.map(
        (stock)=>({symbol:stock.symbol,price:stock.price.toFixed(3),openPrice:stock.openPrice})
    )
};

const saveStocksToFile = () => {
  fs.writeFileSync(stocksFile, JSON.stringify(stocksData));
};

module.exports = { fetchStocks, updateStockPrices, getStockPrices };
