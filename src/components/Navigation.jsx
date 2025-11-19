import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMsal } from '@azure/msal-react';

const Navigation = () => {
  const { instance, accounts } = useMsal();
  const location = useLocation();
  const currentUser = accounts[0];

  const handleLogin = async () => {
    try {
      await instance.loginPopup({
        scopes: ['https://analysis.windows.net/powerbi/api/Report.Read.All'],
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    instance.logoutPopup();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-title">Power BI Reports</h1>
        <ul className="nav-menu">
          <li>
            <Link to="/" className={`nav-btn ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/powerbi" className={`nav-btn ${isActive('/powerbi') ? 'active' : ''}`}>
              Power BI
            </Link>
          </li>
          <li>
            <Link to="/looker" className={`nav-btn ${isActive('/looker') ? 'active' : ''}`}>
              Looker
            </Link>
          </li>
          <li>
            <div id="auth-container">
              {currentUser ? (
                <>
                  <div className="user-info">
                    <span className="user-icon">👤</span>
                    <span className="user-name">{currentUser.name || currentUser.username}</span>
                  </div>
                  <button onClick={handleLogout} className="nav-btn">
                    Sign Out
                  </button>
                </>
              ) : (
                <button onClick={handleLogin} className="nav-btn">
                  Sign In
                </button>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
