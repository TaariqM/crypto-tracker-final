import React, { useState, useEffect } from "react";
import { filter, sortCoins } from "../common/functions";
import CoinCard from "./CoinCard";
import axios from "axios";
import "../css/cryptoDashboard.css";

const CryptoDashboard = (props) => {
  // this 'coinData' state variable will hold the unfiltered and unsorted crypto coins
  // this was created so that when a user is filtering the coins based on text multiple times, it would apply the filter on all of the coins,
  // and not just on the coins that were filtered previously
  // For example, when the component is mounted, and the coins are fetched from the API, the 'coinData' array will be [bitcoin, ethereum, dogecoin, bnb],
  // and the 'coinMarketCapData' array will also be [bitcoin, ethereum, dogecoin, bnb]
  // If the text inputted is 'coin', 'coinMarketCapData' becomes [bitcoin, dogecoin]
  // If the user inputs 'Ethereum' into the input box, it wouldn't be able to check the 'coinMarketCapData' array since its been filtered out previously by 'coin'
  // This is where the 'coinData' array comes in. It will apply the filter to 'coinData', which holds all the coins. These coins that are filtered get placed into the 'coinMarketCapData'
  // Please refer to the 'filter()' function to how this is implemented
  const [coinData, setCoinData] = useState([]);
  const [coinMarketCapData, setCoinMarketCapData] = useState([]); // stores the sorted and/or filtered crypto coins
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API call. component did mount
  useEffect(() => {
    fetchServerCoinData();
  }, []);

  // fetching cryptocoin data from the server
  const fetchServerCoinData = async () => {
    console.log("fetching server data");

    try {
      const response = await axios.get(
        "https://crypto-coin-tracker-6b75.onrender.com/api/cryptocoins"
      );
      if (response) {
        setCoinMarketCapData(response.data);
        setCoinData(response.data);
      } else {
        throw new Error("There was an error loading data");
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // component did update
  useEffect(() => {
    setCoinMarketCapData(filter(props.coin, coinData));
  }, [props.coin]);

  // component did update
  useEffect(() => {
    setCoinMarketCapData(sortCoins(props.dropSelect, coinMarketCapData));
  }, [props.dropSelect]);

  if (isLoading) {
    return <p style={{ textAlign: "center", color: "white" }}>Loading....</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center" }}>{error.message}</p>;
  }

  return (
    <div className="crypto-container">
      {coinMarketCapData.map((currentCoin) => {
        return <CoinCard key={currentCoin.name} {...currentCoin} />;
      })}
    </div>
  );
};

export default CryptoDashboard;
