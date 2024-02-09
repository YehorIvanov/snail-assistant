import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OrdersList from './OrdersList';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import setDocToDB from '../../utils/setDocToDB';
import {
  selectOrdersDesigns,
  subscribeToOrdersDesings,
} from '../../redux/slices/ordersDesingsSlise';
import './Orders.css';
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
    const newOrder = {
      ...selectedDesing,
      creator: { email: user.email, name: user.userName },
      lastUpdate: new Date().getTime(),
      admin: '',
      cafe: '',
      products: [
        ...selectedDesing.products.map((product) => {
          return { ...product, productAmount: 0, productStock: 0 };
        }),
      ],
      status: 'NEW',
      docName: `${new Date().getTime()}-${user.email}`,
    };
    delete newOrder.published;

    setDocToDB('orders', newOrder.docName, newOrder)
      .then(() => {
        console.log('ok');
        navigate(`/orders/${newOrder.docName}`);
      })
      .catch((e) => {
        console.log('error sending', e);
      });
    console.log(newOrder);
  };
  return (
    <div className="orders">
      <h3 className="orders_title">Замовлення</h3>
      <div
        style={{
          height: `${
            ordersDesings.filter((elem) => elem.published).length * 10
          }rem`,
        }}
        className="orders_button-wraper"
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
                    // flex: '0 0 40%',
                  }}
                >
                  {order.name}
                </button>
              );
            })}
      </div>
      <hr />
      {(user.role.isAdmin || user.role.isSuperadmin) && (
        <Link to="/orders/desing-list">
          <button>шаблони замовлень</button>
        </Link>
      )}
      <Link to="/orders/orders-list">
        <button>Мої замовлення</button>
      </Link>
      {/* <OrdersList /> */}
    </div>
  );
};

export default Orders;
