const express = require('express');
const cors = require('cors');
const { fetchStocks, updateStockPrices, getStockPrices } = require('./stocksController.js');

const app = express();
const PORT = 3001;

app.use(cors());

fetchStocks();
setInterval(updateStockPrices, 1000);

app.get('/api/stocks', (req, res) => {
  const stocks = getStockPrices();
  res.json(stocks);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
