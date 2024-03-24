import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import timestampToTimestring from '../../utils/timestampToTimestring';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrders,
  subscribeToOrders,
} from '../../redux/slices/ordersSlice';
import UserLabel from '../User/UserLabel';
import {
  selectOrdersFilters,
  setOrdersFilters,
} from '../../redux/slices/ordersFiltersSlice';
import OrdersFilters from './OrdersFilters';
import './ordersList.css';
import { selectUser } from '../../redux/slices/userSlice';
import queryString from 'query-string';

const OrdersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeToOrders());
  }, [dispatch]);
  const location = useLocation();

  console.log(queryString.parse(location.search));

  const ordersList = useSelector(selectOrders);
  const filters = useSelector(selectOrdersFilters);
  const [filteredOrdersList, setFilteredOrdersList] = useState([...ordersList]);
  const user = useSelector(selectUser);

  useEffect(() => {
    const filtersUpdate = queryString.parse(location.search);
    dispatch(setOrdersFilters({ ...filters, ...filtersUpdate }));
    console.log(filters);
  }, []);
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
        .filter((order) => (filters.name ? order.name === filters.name : true))
        .filter((order) =>
          filters.notStatus ? order.status !== filters.notStatus : true
        ),
    ]);
    console.log(filters.status);
  }, [filters, ordersList]);

  return (
    <div className="orders-list">
      <h4 className="orders-list_title">Мої замовлення</h4>
      {user.role.isAdmin && <OrdersFilters />}
      <div className="orders-list_orders-container">
        {filteredOrdersList.map((elem, i) => {
          return (
            <div className="orders-list_order-box" key={i}>
              <div
                className="orders-list__order-photo"
                style={{
                  backgroundImage: `url(${elem.photo})`,
                  backgroundSize: 'cover',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                }}
              >
                <span className="orders-list_order-status">{elem.status}</span>
              </div>
              <div className="orders-list_order-top">
                <Link
                  className="orders-list_order-name"
                  to={`/orders/viev/${elem.docName}`}
                >
                  {elem.name}
                </Link>
                <span className="orders-list_order-cafe">
                  {elem?.cafe ? elem.cafe : 'Назва Локації'}
                </span>
                <span className="orders-list_order-date">
                  {timestampToTimestring(elem.lastUpdate)}
                </span>
                <div className="orders-list_order-bottom">
                  <UserLabel {...elem?.creator} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersList;
