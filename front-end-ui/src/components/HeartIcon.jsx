import { useState, useEffect } from "react";
import axios from "axios";
import "../css/heartIcon.css";

const HeartIcon = (props) => {
  // this is a boolean variable which will determine if the heart icon becomes red, otherwise remains neutral
  const [isLiked, setIsLiked] = useState(props.isWatched);
  const [hasClicked, setHasClicked] = useState(false); // this will check if the user has clicked the heart icon

  /**
   * This function handles when the heart button gets clicked
   */
  const handleWatchList = () => {
    setIsLiked(!isLiked);
    setHasClicked(true);
  };

  // component did update
  useEffect(() => {
    console.log("Updating Watch List");
    if (hasClicked) {
      if (isLiked) {
        addToWatchList();
      } else {
        removeFromWatchList();
      }
    }

    // console.log(`'isLiked value: ${isLiked}`);
  }, [isLiked, hasClicked]);

  const addToWatchList = async () => {
    console.log(`Adding To Watch List`);

    try {
      await axios.post(
        `https://crypto-coin-tracker-6b75.onrender.com/api/watchlist?symbol=${props.tickerSymbol}`
      );
    } catch (error) {
      throw new Error(
        `There is an error adding the coin to the watch list. Here is the error: ${error}`
      );
    }
  };

  const removeFromWatchList = async () => {
    console.log(`Removing To Watch List`);

    try {
      await axios.delete(
        `https://crypto-coin-tracker-6b75.onrender.com/api/watchlist?symbol=${props.tickerSymbol}`
      );
    } catch (error) {
      throw new Error(
        `There is an error removing the coin from the watch list. Here is the error: ${error}`
      );
    }
  };

  return (
    <div>
      <button className="crypto-card-heart-icon" onClick={handleWatchList}>
        <i className={`fa-regular fa-heart ${isLiked ? "red" : ""}`}></i>
      </button>
    </div>
  );
};

export default HeartIcon;
