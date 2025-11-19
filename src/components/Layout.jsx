import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header>
        <Navigation />
      </header>
      
      <main className="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;
