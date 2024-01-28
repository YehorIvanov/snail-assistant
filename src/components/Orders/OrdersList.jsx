import { useEffect, useState } from 'react';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { Link } from 'react-router-dom';
import timestampToTimestring from '../../utils/timestampToTimestring';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrders,
  subscribeToOrders,
} from '../../redux/slices/ordersSlice';

const OrdersList = () => {
  const dispatch = useDispatch();
  // const [ordersList, setOrdersList] = useState([]);
  const ordersList = useSelector(selectOrders);

  useEffect(() => {
    dispatch(subscribeToOrders());
    // getDocsColectionFromDB('orders').then((data) => {
    //   setOrdersList(data);
    // });
  }, []);
  // console.log(orders);
  return (
    <div>
      <h4>Замовлення</h4>

      {ordersList.map((elem, i) => {
        return (
          <div className="" key={i} style={{ border: '1px solid silver' }}>
            <div>
              <Link to={`/orders/viev/${elem.docName}`}>{elem.name}</Link>
              <span>{elem?.cafe}</span>
            </div>
            <div>
              <span>{elem.creator?.email}</span>
              <span>{timestampToTimestring(elem.lastUpdate)}</span>
              <span>{elem.status}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;
