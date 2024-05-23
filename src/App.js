import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import LoginForm from "./components/account/LoginForm";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
