import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <div className="hero-section">
        <h2>Welcome to PowerBI Report</h2>
        <p>Access your operations intelligence dashboard with MSAL.js authentication.</p>
        
        <div className="card-grid">
          <div className="card">
            <h3>📊 Power BI Reports</h3>
            <p>
              Interactive business intelligence dashboards powered by Power BI.
            </p>
            <Link to="/powerbi" className="btn btn-primary">
              View Dashboard
            </Link>
          </div>
          
          <div className="card">
            <h3>📊 Looker Report</h3>
            <p>
              Interactive business intelligence dashboards powered by Looker.
            </p>
            <Link to="/looker" className="btn btn-primary">
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
