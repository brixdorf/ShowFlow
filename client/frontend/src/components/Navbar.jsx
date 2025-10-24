import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, favoritesCount, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ShowFlow
        </Link>

        <div className="navbar-menu">
          {user ? (
            <>
              <Link to="/favorites" className="navbar-link favorites-link">
                Favorites
                <span className="navbar-favorites-count">{favoritesCount}</span>
              </Link>
              <span className="navbar-user">
                <span className="user-icon">👤</span> {user.username}
              </span>
              <button onClick={handleLogout} className="navbar-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;