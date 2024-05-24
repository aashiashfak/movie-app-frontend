import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {clearUser} from "../../redux/userReducer";
import "./Header.css";

function Header() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/Login");
  };

  return (
    <header className="header">
      <div className="left-section" >
        <div>
          <h1 className="logo">Movie App</h1>
        </div>
        {user && <div style={{padding:'24px'}}>
           <span className="username">Hello,{user.username}</span>
        </div>}
      </div>
      <nav className="nav">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/watchlist" className="link">
          Watchlist
        </Link>
        {user ? (
          <button className="button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/Login">
            <button className="button">Signup</button>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
