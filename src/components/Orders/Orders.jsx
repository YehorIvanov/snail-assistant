import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import {
  selectOrdersDesigns,
  subscribeToOrdersDesings,
} from '../../redux/slices/ordersDesingsSlise';
import './Orders.css';
import OrdersObserver from './OrdersObserver';
const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeToOrdersDesings());
  }, [dispatch]);

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const ordersDesings = useSelector(selectOrdersDesigns);

  const handlerNewOrder = (slug) => {
    const selectedDesing = {
      ...ordersDesings.filter((desing) => desing.slug === slug)[0],
    };

    navigate(`/orders/${selectedDesing.slug}`);
  };
  return (
    <div className="orders">
      <h3 className="orders_title">Замовлення</h3>
      <OrdersObserver />

      {user.role.isBarista && (
        <div
          className="orders_button-wraper"
          style={{
            maxHeight: `${
              ordersDesings.filter((elem) => elem.published).length * 10
            }rem`,
          }}
        >
          {ordersDesings &&
            ordersDesings
              .filter((order) => order.published)
              .map((order) => {
                return (
                  <button
                    className="orders_new-order-btn"
                    key={order.slug}
                    onClick={() => {
                      handlerNewOrder(order.slug);
                    }}
                    style={{
                      backgroundImage: `url(${order.photo})`,
                    }}
                  >
                    {order.name}
                  </button>
                );
              })}
        </div>
      )}
      <Link to="/orders/orders-list">
        <button>Мої замовлення</button>
      </Link>
      {(user.role.isAdmin || user.role.isSuperadmin) && (
        <Link to="/orders/desing-list">
          <button>шаблони замовлень</button>
        </Link>
      )}
    </div>
  );
};

export default Orders;
