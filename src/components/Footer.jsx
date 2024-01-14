import React from 'react';
import {
  FaRegUserCircle,
  FaHome,
  FaShoppingCart,
  FaBook,
} from 'react-icons/fa';
import { GoChecklist } from 'react-icons/go';
function Footer() {
  return (
    <footer className="footer">
      <FaBook size="2em" />
      <FaShoppingCart size="2em" />
      <FaHome size="2em" />
      <GoChecklist size="2em" />
      <FaRegUserCircle size="2em" />
    </footer>
  );
}

export default Footer;
