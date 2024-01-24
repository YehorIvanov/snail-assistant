import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <div className="container">
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
