import React from "react";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="logo">Movie App</h1>
      <nav className="nav">
        <a href="Home" className="link">
          Home
        </a>
        <a href="WatchList" className="link">
          Watchlist
        </a>
        <button className="button">Signup</button>
      </nav>
    </header>
  );
}

export default Header;
