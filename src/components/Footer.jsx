import {
  FaRegUserCircle,
  FaHome,
  FaShoppingCart,
  FaBook,
  FaUserCircle,
} from 'react-icons/fa';
import { GoChecklist } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../redux/slices/userSlice';

function Footer() {
  const user = useSelector(selectUser);
  return (
    <footer className="footer">
      <Link to="/docs">
        <FaBook size="2em" />
      </Link>
      <Link to="/orders">
        <FaShoppingCart size="2em" />
      </Link>
      <Link to="/">
        <FaHome size="2em" />
      </Link>
      <Link to="/reports">
        <GoChecklist size="2em" />
      </Link>
      <Link to="/user">
        {!!user ? <FaUserCircle size="2em" /> : <FaRegUserCircle size="2em" />}
      </Link>
    </footer>
  );
}

export default Footer;
