const mongoose = require("mongoose");

// Define the watchitem schema
const watchItemSchema = mongoose.Schema({
  symbol: String,
  dateCreated: Date,
});

// Create the watchitem model (watchitem database)
const WatchItem = mongoose.model("WatchItem", watchItemSchema);

module.exports = WatchItem;
