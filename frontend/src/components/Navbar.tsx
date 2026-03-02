import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const { theme, changeTheme } = useTheme();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          GreenIQ
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            {/* Language Selector */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                🌐 {t('language_selector')}
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                {(['en', 'es', 'fr', 'hi', 'ta', 'mai'] as const).map((lang) => (
                  <li key={lang}>
                    <a
                      className={`dropdown-item ${language === lang ? 'active' : ''}`}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        changeLanguage(lang);
                      }}
                    >
                      {t(lang === 'en' ? 'english' : lang === 'es' ? 'spanish' : lang === 'fr' ? 'french' : lang === 'hi' ? 'hindi' : lang === 'ta' ? 'tamil' : 'maithili')}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            {/* Theme Selector */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="themeDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                🎨 {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '✨'} Theme
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a
                    className={`dropdown-item ${theme === 'light' ? 'active' : ''}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      changeTheme('light');
                    }}
                  >
                    ☀️ Light Mode
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${theme === 'dark' ? 'active' : ''}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      changeTheme('dark');
                    }}
                  >
                    🌙 Dark Mode
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${theme === 'nightLight' ? 'active' : ''}`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      changeTheme('nightLight');
                    }}
                  >
                    ✨ Night Light Mode
                  </a>
                </li>
              </ul>
            </li>

            {/* Navigation Links */}
            <li className="nav-item">
              <Link className="nav-link" to="/features" onClick={() => setExpanded(false)}>
                {t('features')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/farming-techniques" onClick={() => setExpanded(false)}>
                {t('farming_techniques')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/soil-information" onClick={() => setExpanded(false)}>
                {t('soil_info')}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/marketplace" onClick={() => setExpanded(false)}>
                {t('marketplace')}
              </Link>
            </li>

            {/* Auth Links */}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => setExpanded(false)}>
                    {t('login')}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={() => setExpanded(false)}>
                    {t('register')}
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  👤 {user.name}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#profile">
                      {t('profile')}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#logout"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      {t('logout')}
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
