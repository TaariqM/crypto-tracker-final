import { React, useState } from "react";
import "../css/navigation.css";

const Navigation = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  /**
   * This function handles the hamburger menu being clicked
   *
   * @param {*} e
   */
  const handleHamburgerMenuClick = (e) => {
    e.preventDefault();
    setIsNavOpen(!isNavOpen);
    console.log(isNavOpen);
  };

  return (
    <div className="nav-container">
      <i className="fa-solid fa-bars" onClick={handleHamburgerMenuClick}></i>
      <nav className={`navbar ${isNavOpen ? " open" : ""} `}>
        <ul>
          <li>
            <a href="/">Crypto Dashboard</a>
          </li>
          <li>
            <a href="/watchlist">Watchlist</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
