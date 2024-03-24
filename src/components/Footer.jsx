import {
  FaRegUserCircle,
  FaHome,
  FaShoppingCart,
  FaBook,
  FaUserCircle,
  FaClipboardCheck,
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../redux/slices/userSlice';
import './Footer.css';
function Footer() {
  const user = useSelector(selectUser);
  return (
    <footer className="footer">
      <nav className="footer_nav">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'footer_link__active' : 'footer_link'
          }
          to="/"
        >
          <FaHome size="3rem" />
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            isActive ? 'footer_link__active' : 'footer_link'
          }
          to="/orders"
        >
          <FaShoppingCart size="3rem" />
        </NavLink>

        {/* <NavLink
          className={({ isActive }) =>
            isActive ? 'footer_link__active' : 'footer_link'
          }
          to="/reports"
        >
          <FaClipboardCheck size="3rem" />
        </NavLink> */}
        <NavLink
          className={({ isActive }) =>
            isActive ? 'footer_link__active' : 'footer_link'
          }
          to="/docs"
        >
          <FaBook size="3rem" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? 'footer_link__active' : 'footer_link'
          }
          to="/user"
        >
          {!!user ? (
            <FaUserCircle size="3rem" />
          ) : (
            <FaRegUserCircle size="3rem" />
          )}
        </NavLink>
      </nav>
    </footer>
  );
}

export default Footer;
