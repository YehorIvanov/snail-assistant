import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import timestampToTimestring from '../../utils/timestampToTimestring';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrders,
  subscribeToOrders,
} from '../../redux/slices/ordersSlice';
import { selectUsers } from '../../redux/slices/usersSlice';
import '../../img/1706184943469-2229696@gmail.com.jpeg';
import UserLabel from '../User/UserLabel';
import './ordersList.css';
import { FaReply } from 'react-icons/fa';
const OrdersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeToOrders());
  }, [dispatch]);

  const ordersList = useSelector(selectOrders);
  const users = useSelector(selectUsers);
  console.log(ordersList);
  const getUniqueBarista = (ordersList) => {
    let uniqueValues = new Set();
    ordersList.forEach((order) => {
      if (order.creator.name) {
        const baristaString = JSON.stringify(order.creator.name);
        uniqueValues.add(baristaString);
      }
    });
    return Array.from(uniqueValues).map((baristaString) =>
      JSON.parse(baristaString)
    );
  };
  console.log(getUniqueBarista(ordersList));
  return (
    <div className="orders-list">
      <h4 className="orders-list_title">Мої замовлення</h4>
      <div className="orders-list_filters">
        <div className="orders-list_filter-group">
          <select>
            <option value="">Type</option>
          </select>
          <select placeholder="cafe">
            <option value="">cafe</option>
          </select>
        </div>
        <div className="orders-list_filter-group">
          <select>
            <option value="">Бариста</option>
            {ordersList &&
              getUniqueBarista(ordersList).map((barista) => {
                return <option value={barista}>{barista}</option>;
              })}
          </select>
          <select placeholder="cafe">
            <option value="">status</option>
          </select>
        </div>
        <div className="orders-list_filter-group">
          <button
            className="order-view_button"
            style={{
              width: 'var(--elem-height)',
              minWidth: 'var(--elem-height)',
              height: 'var(--elem-height)',
              padding: '0.5rem',
            }}
            onClick={() => {
              navigate('./');
            }}
          >
            <FaReply />
          </button>
          <select name="" id="">
            <option value="">admin</option>
          </select>
        </div>
      </div>
      {ordersList.map((elem, i) => {
        return (
          <div
            className="orders-list_order-box"
            key={i}
            style={{
              backgroundImage: `url(${elem.photo}), linear-gradient(45deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))`,
            }}
          >
            <div className="orders-list_order-top">
              <Link
                className="orders-list_order-name"
                to={`/orders/viev/${elem.docName}`}
              >
                {elem.name}
              </Link>
              <UserLabel {...elem?.creator} />
            </div>
            <span className="orders-list_order-status">{elem.status}</span>
            <div>
              <div className="orders-list_order-bottom">
                <span className="orders-list_order-cafe">
                  {elem?.cafe ? elem.cafe : 'Назва Локації'}
                </span>
                <span
                  className="orders-list_order-date"
                  style={{ fontSize: '1.2rem' }}
                >
                  {timestampToTimestring(elem.lastUpdate)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;
