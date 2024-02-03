import {
  FaRegUserCircle,
  FaHome,
  FaShoppingCart,
  FaBook,
  FaUserCircle,
  FaClipboardCheck,
} from 'react-icons/fa';
import { GoChecklist } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../redux/slices/userSlice';

function Footer() {
  const user = useSelector(selectUser);
  return (
    <footer className="footer">
      <nav className="footer_nav">
        <Link className="footer_link" to="/docs">
          <FaBook size="3rem" />
        </Link>
        <Link className="footer_link" to="/orders">
          <FaShoppingCart size="3rem" />
        </Link>
        <Link className="footer_link" to="/">
          <FaHome size="3rem" />
        </Link>
        <Link className="footer_link" to="/reports">
          <FaClipboardCheck size="3rem" />
        </Link>
        <Link className="footer_link" to="/user">
          {!!user ? (
            <FaUserCircle size="3rem" />
          ) : (
            <FaRegUserCircle size="3rem" />
          )}
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
