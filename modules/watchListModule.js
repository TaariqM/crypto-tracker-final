const {
  getWatchItemSymbols,
  createWatchItem,
  removeWatchItem,
} = require("./mongooseModule");
const getCryptoCoins = require("./cryptoCoinModule");

const addItem = async (symbol) => {
  try {
    if (!symbol) {
      console.log("Symbol is not valid");
    }
    createWatchItem(symbol);
  } catch (err) {
    console.log(`error adding item: ${err}`);
  }

  console.log(`item ${symbol} added to watch list`);
};

const getItems = async () => {
  try {
    console.log(`watch list items fetched...`);

    const coins = await getCryptoCoins();
    const watchSymbols = await getWatchItemSymbols();

    const filteredCoinsData = coins.filter((coin) => {
      return watchSymbols.includes(coin.tickerSymbol);
    });

    return filteredCoinsData;
  } catch (err) {
    console.log(`error fetching items ${err}`);
  }
};

const removeItem = async (symbol) => {
  try {
    if (!symbol) {
      console.log("Symbol is not valid");
    }

    removeWatchItem(symbol);
    console.log(`item ${symbol} removed from watch list`);
  } catch (err) {
    console.log(`error removing item: ${err}`);
  }
};

module.exports = {
  addItem,
  removeItem,
  getItems,
};
