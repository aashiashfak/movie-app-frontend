import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginForm from "./pages/account/LoginForm";
import Home from "./pages/Home/Home";
import Watchlist from "./pages/watchlist/WatchList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/" element={<Home />} />
        <Route path="/Watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
};

export default App;
