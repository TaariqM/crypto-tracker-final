// ------------------------------------------ This file handles the connection to the Database ------------------------------------------ //

const mongoose = require("mongoose");

// const dbUrl = "mongodb://localhost:27017/crypto-coin-tracker";
const dbUrl = process.env.DB_URI;

const connectToDb = async () => {
  console.log(process.env.DB_URI);
  const dbConnection = mongoose.connection;

  // set event listeners - before await connect to ensure listeners are configured before connection starts
  dbConnection.on("open", () => {
    console.log("Connected to MongoDB");
  });

  dbConnection.on("error", (err) => {
    console.log(`Mongoose connection error: ${err}`);
  });

  await mongoose.connect(dbUrl);
};

module.exports = {
  connectToDb,
};
