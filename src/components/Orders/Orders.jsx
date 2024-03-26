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
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const ordersDesings = useSelector(selectOrdersDesigns);

  useEffect(() => {
    dispatch(subscribeToOrdersDesings());
  }, [dispatch]);

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
              ordersDesings.filter((elem) => elem.published).length * 13
            }rem`,
          }}
        >
          {ordersDesings &&
            ordersDesings
              .filter((order) => order.published)
              .map((order) => {
                return (
                  <div key={order.slug} className="orders__new-order">
                    <div
                      className="orders__new-order-img"
                      style={{
                        backgroundImage: `url(${order.photo})`,
                      }}
                      alt={order.slug}
                      onClick={() => {
                        handlerNewOrder(order.slug);
                      }}
                    ></div>
                    <h6
                      className="orders__new-order-title"
                      onClick={() => {
                        handlerNewOrder(order.slug);
                      }}
                    >
                      {order.name}
                    </h6>
                  </div>
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
