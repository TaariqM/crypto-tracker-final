import React, { useState } from "react";
import "../css/searchPanel.css";

const SearchPanel = (props) => {
  const [searchText, setSearchText] = useState("");
  const [dropDownSelect, setDropDownSelect] = useState("");

  /**
   * This function will handle when the search button is clicked
   *
   * @returns the inputted text to the searchCallback callback function, otherwise returns nothing
   */
  const handleClick = () => {
    if (!searchText && !dropDownSelect) {
      return;
    }

    if (dropDownSelect) {
      props.dropDownCallback(dropDownSelect);
    }

    props.searchCallback(searchText);
  };

  /**
   * This function checks the state of which option is selected in the dropdown menu
   *
   * @param {*} e
   */
  const handleSelectChange = (e) => {
    setDropDownSelect(e.target.value);
  };

  /**
   * This function will check if the enter key is pressed
   *
   * @param {*} e
   */
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      // if the keyboard key that is pressed is the 'Enter' key (the key code for enter is '13')
      if (searchText) {
        props.searchCallback(searchText);
      }
    }
  };

  /**
   * This function tracks the state of the text inputted in the search bar.
   *
   * @param {*} e
   */
  const handleOnChange = (e) => {
    setSearchText(e.target.value); //update search text state
  };

  return (
    <div className="searchBar-dropdown-container">
      <div className="searchBar">
        <input
          type="text"
          placeholder="Search Cryptocurrency"
          className="searchBar-input"
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          value={searchText}
        />
      </div>

      <div className="dropdown-menu">
        <select onChange={handleSelectChange}>
          <option defaultValue={"- Select - "}>- Select -</option>
          <option>Current Price</option>
          <option>Market Cap</option>
          <option>24th Volume</option>
          <option>24th Change</option>
        </select>
      </div>

      <button className="btn" onClick={handleClick}>
        Search
      </button>
    </div>
  );
};

export default SearchPanel;
