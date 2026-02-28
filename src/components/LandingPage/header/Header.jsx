import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useTheme } from "../../../context/ThemeContext";
import logoDarkMode from "../../../assets/HeaderAndLogo/Logo Dark mode.png";
import logoLightMode from "../../../assets/HeaderAndLogo/Logo light mode.png";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="header-wrapper">
      <div className="logos-section">
        <img
          src={theme === "dark" ? logoDarkMode : logoLightMode}
          alt="Vision Logo"
          className="header-logo"
          onClick={() => navigate("/")}
        />
      </div>

      <header className="top-header">
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a onClick={() => { navigate("/"); setMenuOpen(false); }}>
            الرئيسية
          </a>
          <a onClick={() => { navigate("/map"); setMenuOpen(false); }}>
            لوحة التحكم
          </a>
          <a onClick={() => { navigate("/map-page"); setMenuOpen(false); }}>
        خريطة المدينة المنورة 2020
          </a>
          <a onClick={() => { navigate("/map-page2"); setMenuOpen(false); }}>
        خريطة المدينة المنورة 2024
          </a>
          <a onClick={() => { navigate("#"); setMenuOpen(false); }}>
     قريبا خارطة منطقة الشرقية 
          </a>
          <a onClick={() => { navigate("/contact"); setMenuOpen(false); }}>
            تواصل معنا
          </a>

          <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title="Switch Theme"
          >
            {theme === "dark" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#b69767"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3V4M12 20V21M4 12H3M21 12H20M5.31412 5.31412L6.02115 6.02115M17.9789 17.9789L18.6859 18.6859M5.31412 18.6859L6.02115 17.9789M17.9789 6.02115L18.6859 5.31412"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#b69767"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Header;
