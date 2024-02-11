import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import timestampToTimestring from '../../utils/timestampToTimestring';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrders,
  subscribeToOrders,
} from '../../redux/slices/ordersSlice';
// import '../../img/1706184943469-2229696@gmail.com.jpeg';
import UserLabel from '../User/UserLabel';
import './ordersList.css';
import { selectOrdersFilters } from '../../redux/slices/ordersFiltersSlice';
import OrdersFilters from './OrdersFilters';
const OrdersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeToOrders());
  }, [dispatch]);

  const ordersList = useSelector(selectOrders);
  const filters = useSelector(selectOrdersFilters);
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

  return (
    <div className="orders-list">
      <h4 className="orders-list_title">Мої замовлення</h4>
    <OrdersFilters/>
      {filteredOrdersList.map((elem, i) => {
        return (
          <div
            className="orders-list_order-box"
            key={i}
            style={{
              backgroundImage: `url(${elem.photo}), linear-gradient(45deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))`,
            }}
          >
            <Link
              className="orders-list_order-name"
              to={`/orders/viev/${elem.docName}`}
            >
              {elem.name}
            </Link>
            <div className="orders-list_order-top">
              <span className="orders-list_order-cafe">
                {elem?.cafe ? elem.cafe : 'Назва Локації'}
              </span>{' '}
              <span className="orders-list_order-status">{elem.status}</span>
            </div>
            <div>
              <div className="orders-list_order-bottom">
                <UserLabel {...elem?.creator} />
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
