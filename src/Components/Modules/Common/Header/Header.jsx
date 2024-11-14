import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { getSessionStorage } from "../../Common/Login/Auth/auth";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const users = getSessionStorage("user");

  const handleAdminClick = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars menu-bar"></i>
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown" ref={dropdownRef}>
          <button
            className="nav-link btn"
            onClick={handleAdminClick}
            role="button"
          >
            <i className="fas fa-user-shield"></i> {users.userName}
          </button>
          {showDropdown && (
            <div className="dropdown-menu dropdown-menu-right show">
              <li className="nav-item">
                <a className="nav-link" href="/profile" role="button">
                  <i className="fas fa-user"></i> {users.userName}
                </a>
                <a className="dropdown-item" href="/logout" role="button">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </a>
              </li>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
