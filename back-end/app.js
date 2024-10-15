const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { connectToDb } = require("./database/connectionManager");
const getCryptoCoins = require("./modules/cryptoCoinModule");

// create an instance of express app
const app = new express();
const watchListModule = require("./modules/watchListModule");

// const port = 3000;

//------------------------------------------ Setup Middleware ------------------------------------------ //
app.use(express.json()); // middleware to parse JSON requests
app.use(cors());

//------------------------------------------ Define Routes ------------------------------------------ //
// fetch watchlist
app.get("/api/watchlist", async (req, res) => {
  console.log("GET - watchlist called");

  const data = await watchListModule.getItems();
  // complete request, with response
  res.send(data);
});

// add to watchlist
app.post("/api/watchlist", async (req, res) => {
  console.log("POST - received on server");
  // get the symbol from request parameters
  const { symbol } = req.query;

  await watchListModule.addItem(symbol);

  res.send();
});

// remove from watchlist
app.delete("/api/watchlist", async (req, res) => {
  console.log("DELETE - received on server");
  const { symbol } = req.query;

  await watchListModule.removeItem(symbol);

  res.send();
});

// the backend should manage the calls to the coinmarketcap external api and deal with CORS!
// not the front end

// fetch crypto coins
app.get("/api/cryptocoins", async (req, res) => {
  const data = await getCryptoCoins();
  res.send(data);
});

// ------------------------------------------ Use the font-end-ui App ------------------------------------------ //
app.use(express.static(path.join(__dirname, "/front-end-ui/dist")));

// Render client for any path
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/front-end-ui/dist/index.html"));
});

// ------------------------------------------ Connect to MongoDB and Start Express Server ------------------------------------------ //
connectToDb().then(() => {
  console.log("MongoDB connection completed");

  // Start Express Server on Specific Port
  app.listen(process.env.PORT, () => {
    console.log(`CORS-enabled Express Server started on ${process.env.PORT}`);
  });
});
