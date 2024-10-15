import React, { useState } from "react";
import SearchPanel from "../components/SearchPanel";
import Navigation from "../components/Navigation";
import CryptoDashboard from "../components/CryptoDashboard";
import Footer from "../components/Footer";
import "../css/dashboard.css";

const Dashboard = () => {
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

  return (
    <div className="dashboard-container">
      <header>
        <Navigation />
        <h1 className="website-title">Crypto Coin Tracker</h1>
      </header>
      <main>
        <SearchPanel
          searchCallback={handleSearch}
          dropDownCallback={handleDropDown}
        />
        <CryptoDashboard coin={searchBoxVal} dropSelect={dropDownVal} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
