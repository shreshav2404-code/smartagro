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
              <button
                className="nav-link dropdown-toggle"
                id="languageDropdown"
                data-bs-toggle="dropdown"
                style={{ border: 'none', background: 'none' }}
              >
                🌐 {t('language_selector')}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {(['en', 'es', 'fr', 'hi', 'ta', 'mai'] as const).map((lang) => (
                  <li key={lang}>
                    <button
                      className={`dropdown-item ${language === lang ? 'active' : ''}`}
                      onClick={() => changeLanguage(lang)}
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                      {t(lang === 'en' ? 'english' : lang === 'es' ? 'spanish' : lang === 'fr' ? 'french' : lang === 'hi' ? 'hindi' : lang === 'ta' ? 'tamil' : 'maithili')}
                    </button>
                  </li>
                ))}
              </ul>
            </li>

            {/* Theme Selector */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                id="themeDropdown"
                data-bs-toggle="dropdown"
                style={{ border: 'none', background: 'none' }}
              >
                🎨 {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '✨'} Theme
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className={`dropdown-item ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => changeTheme('light')}
                    style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                  >
                    ☀️ Light Mode
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => changeTheme('dark')}
                    style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                  >
                    🌙 Dark Mode
                  </button>
                </li>
                <li>
                  <button
                    className={`dropdown-item ${theme === 'nightLight' ? 'active' : ''}`}
                    onClick={() => changeTheme('nightLight')}
                    style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                  >
                    ✨ Night Light Mode
                  </button>
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
                <button
                  className="nav-link dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  style={{ border: 'none', background: 'none' }}
                >
                  👤 {user.name}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button
                      className="dropdown-item"
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                      {t('profile')}
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
                    >
                      {t('logout')}
                    </button>
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
