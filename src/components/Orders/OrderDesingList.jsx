import { FaPencilAlt } from 'react-icons/fa';
import NewOrderDesing from './NewOrderDesing';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrdersDesigns,
  subscribeToOrders,
} from '../../redux/slices/ordersDesingsSlise';
import { useEffect } from 'react';

const OrderDesingList = () => {
  const ordersDesings = useSelector(selectOrdersDesigns);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeToOrders());
  }, []);

  return (
    <div className="order-deing-list" style={{ padding: '1rem' }}>
      <h3>Шаблони замовлень</h3>
      <table className="u-full-width">
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
    </div>
  );
};

export default OrderDesingList;
