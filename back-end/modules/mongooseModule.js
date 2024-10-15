const WatchItem = require("../models/watchItem");

const getWatchItemSymbols = async () => {
  // fetch all wathlist docs from MongoDB
  // convert this to async/await to allow the database to respond
  const watchItems = await WatchItem.find({});

  // then get the symbols in the watchlist
  const watchListSymbols = watchItems.map((item) => {
    return item.symbol;
  });

  return watchListSymbols;
};

const createWatchItem = async (symbol) => {
  // add symbol to watch list
  const item = new WatchItem({
    symbol: symbol,
    dateCreated: Date.now(),
  });

  await item.save();
};

const removeWatchItem = async (symbol) => {
  await WatchItem.deleteOne({ symbol: symbol });
};

module.exports = {
  getWatchItemSymbols,
  createWatchItem,
  removeWatchItem,
};
