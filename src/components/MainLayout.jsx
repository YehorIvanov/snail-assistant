import React from 'react';
import { Outlet } from 'react-router';
import Footer from './Footer';
import Error from './Error';

const MainLayout = () => {
  return (
    <div className="container">
      {/* <Error /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
