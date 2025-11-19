import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2025 Power BI Report Site. Powered by React & MSAL.js</p>
          <div className="footer-links">
            <a href="https://github.com/Liminghao0922/powerbi-report-site" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="/docs/MSAL_DIRECT_AUTH_GUIDE.md" target="_blank" rel="noopener noreferrer">
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
