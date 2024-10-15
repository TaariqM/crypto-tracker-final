import { useState, useEffect } from "react";
import axios from "axios";
import CoinCard from "../components/CoinCard";
import Navigation from "../components/Navigation";
import SearchPanel from "../components/SearchPanel";
import Footer from "../components/Footer";
import { filter, sortCoins } from "../common/functions";
import "../css/watchlist.css";

/**
 * Array that holds the values that the crypto coins can be sorted by.
 * This array is created to make sorting of the crypto coins easier,
 * as the options in the drop down menu are not exactly the same as whats in the array of objects.
 * For example, 'Current Price' in the drop down menu is not equal to 'price'
 */
const dropDownOptions = ["price", "market", "volume", "change"];

const Watchlist = () => {
  const [watchItems, setWatchItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchBoxVal, setSearchBoxVal] = useState(""); // stores the value of text that is typed in the search box, which is then passed down to child components
  const [dropDownVal, setDropDownVal] = useState(""); // stores the dropdown menu item that is selected

  /**
   * Function that handles the text that is entered into the search box.
   * It is passed down as a callback function to the SearchPanel component.
   * The value that is passed up from the child components is stored in 'searchBoxVal',
   * which is then passed as a prop into the CryptoDashboard component
   *
   * @param {string} searchText
   */
  const handleSearch = (searchText) => {
    setSearchBoxVal(searchText);
  };

  /**
   * Function that handles the dropdown menu selection.
   * This function is passed down as a callback function to the SearchPanel component.
   * The value that is passed up from the child components is stored in 'dropDownVal',
   * which is then passed as a prop into the CryptoDashboard
   *
   * @param {string} dropDownSelect
   */
  const handleDropDown = (dropDownSelect) => {
    setDropDownVal(dropDownSelect);
  };

  // asynchronously fetch watch list on componentDidMount
  useEffect(() => {
    const fetchWatchList = async () => {
      console.log("watchItems fetched");

      try {
        const response = await axios.get(
          "https://crypto-coin-tracker-6b75.onrender.com/api/watchlist"
        );
        if (!response) {
          throw new Error("There was an error fetching watchlist");
        }
        console.log(`watchlist data: ${JSON.stringify(response.data)}`);
        setWatchItems(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchList();
  }, []);

  // component did update
  useEffect(() => {
    //filter(searchBoxVal);
    // const filteredCoins = filter(searchBoxVal, watchItems);
    setWatchItems(filter(searchBoxVal, watchItems));
  }, [searchBoxVal]);

  // component did update
  useEffect(() => {
    // const sortedCoins = functions.sortCoins(dropDownVal, watchItems);
    setWatchItems(sortCoins(dropDownVal, watchItems));
    // sortCoins(dropDownVal);
  }, [dropDownVal]);

  if (isLoading) {
    return <p style={{ textAlign: "center", color: "white" }}>Loading....</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center" }}>{error.message}</p>;
  }

  return (
    <div className="watchlist-container">
      <header>
        <Navigation />
        <h1 className="watchlist-title">Crypto Coin Watchlist</h1>
      </header>
      <main>
        <SearchPanel
          searchCallback={handleSearch}
          dropDownCallback={handleDropDown}
        />
        <div className="crypto-container">
          {watchItems.map((currentCoin) => {
            return <CoinCard key={currentCoin.name} {...currentCoin} />;
          })}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Watchlist;
