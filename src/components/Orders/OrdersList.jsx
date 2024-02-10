import { useEffect, useState } from 'react';
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
  // const users = useSelector(selectUsers);
  // console.log(ordersList);

  const getUniqueBarista = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.creator.name && uniqueValues.add(order.creator.name);
    });
    return Array.from(uniqueValues);
  };
  const getUniqueCafe = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.cafe && uniqueValues.add(order.cafe);
    });
    return Array.from(uniqueValues);
  };
  const getUniqueStatus = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.status && uniqueValues.add(order.status);
    });
    return Array.from(uniqueValues);
  };
  const getUniqueAdmin = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.admin.userName && uniqueValues.add(order.admin.userName);
    });
    return Array.from(uniqueValues);
  };
  const getUniqueOrderTypes = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.name && uniqueValues.add(order.name);
    });
    return Array.from(uniqueValues);
  };

  const [filters, setFilters] = useState({
    barista: '',
    admin: '',
    status: '',
    cafe: '',
    name: '',
  });
  const [filteredOrdersList, setFilteredOrdersList] = useState([...ordersList]);

  useEffect(() => {
    setFilteredOrdersList([
      ...ordersList
        .filter((order) => (filters.cafe ? order.cafe === filters.cafe : true))
        .filter((order) =>
          filters.barista ? order.creator.name === filters.barista : true
        )
        .filter((order) =>
          filters.admin ? order.admin.userName === filters.admin : true
        )
        .filter((order) =>
          filters.status ? order.status === filters.status : true
        )
        .filter((order) => (filters.name ? order.name === filters.name : true)),
    ]);
  }, [filters, ordersList]);
  console.log(filters, filteredOrdersList);
  return (
    <div className="orders-list">
      <h4 className="orders-list_title">Мої замовлення</h4>
      <div className="orders-list_filters">
        <div className="orders-list_filter-group">
          <select
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          >
            <option value="">Тип замовлення</option>
            {ordersList &&
              getUniqueOrderTypes(ordersList).map((name) => {
                return (
                  <option key={name} value={name}>
                    {name}
                  </option>
                );
              })}
          </select>

          <select
            value={filters.cafe}
            onChange={(e) => setFilters({ ...filters, cafe: e.target.value })}
          >
            <option value="">Локація</option>
            {ordersList &&
              getUniqueCafe(ordersList).map((cafe) => {
                return (
                  <option key={cafe} value={cafe}>
                    {cafe}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="orders-list_filter-group">
          <select
            value={filters.barista}
            onChange={(e) =>
              setFilters({ ...filters, barista: e.target.value })
            }
          >
            <option value="">Бариста</option>
            {ordersList &&
              getUniqueBarista(ordersList).map((barista) => {
                return (
                  <option key={barista} value={barista}>
                    {barista}
                  </option>
                );
              })}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">Стан</option>
            {ordersList &&
              getUniqueStatus(ordersList).map((status) => {
                return (
                  <option key={status} value={status}>
                    {status}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="orders-list_filter-group">
          <select
            value={filters.admin}
            onChange={(e) => setFilters({ ...filters, admin: e.target.value })}
          >
            <option value="">admin</option>
            {ordersList &&
              getUniqueAdmin(ordersList).map((admin) => {
                return (
                  <option key={admin} value={admin}>
                    {admin}
                  </option>
                );
              })}
          </select>

          <button
            className="order-view_button button-round"
            onClick={() => {
              navigate('/orders');
            }}
          >
            <FaReply />
          </button>
        </div>
      </div>
      {filteredOrdersList.map((elem, i) => {
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
