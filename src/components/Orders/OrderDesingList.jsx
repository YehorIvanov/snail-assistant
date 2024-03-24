import { FaPencilAlt, FaReply } from 'react-icons/fa';
import NewOrderDesing from './NewOrderDesing';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrdersDesigns,
  subscribeToOrdersDesings,
} from '../../redux/slices/ordersDesingsSlise';
import { useEffect } from 'react';

const OrderDesingList = () => {
  const navigate = useNavigate();
  const ordersDesings = useSelector(selectOrdersDesigns);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeToOrdersDesings());
  }, [dispatch]);

  return (
    <div className="order-deing-list" style={{ padding: '1rem' }}>
      <h3>Шаблони замовлень</h3>
      <table style={{ width: '95%' }}>
        <tbody>
          {ordersDesings.map((elem, i) => (
            <tr key={i}>
              <td>
                <Link to={`/orders/order-desinger/${elem.slug}`}>
                  {elem.name}
                </Link>
              </td>
              <td>{elem.products.length}</td>
              <td>
                <FaPencilAlt size="1rem" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NewOrderDesing />
      <button
        onClick={() => {
          navigate('/orders');
        }}
      >
        <FaReply />
      </button>
    </div>
  );
};

export default OrderDesingList;
