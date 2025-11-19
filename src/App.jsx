import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { msalConfig } from './config/authConfig';
import Layout from './components/Layout';
import Home from './pages/Home';
import PowerBIReport from './pages/PowerBIReport';
import LookerReport from './pages/LookerReport';

// Initialize MSAL instance
const msalInstance = new PublicClientApplication(msalConfig);

// Handle redirect promise
msalInstance.initialize().then(() => {
  msalInstance.handleRedirectPromise().catch((error) => {
    console.error('Redirect error:', error);
  });
});

function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="powerbi" element={<PowerBIReport />} />
            <Route path="looker" element={<LookerReport />} />
          </Route>
        </Routes>
      </Router>
    </MsalProvider>
  );
}

export default App;
