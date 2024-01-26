import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useEffect, useState } from 'react';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';
import timestampToTimestring from '../../utils/timestampToTimestring';

const OrdersList = () => {
  const user = useSelector(selectUser);
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    getDocsColectionFromDB('orders').then((data) => {
      setOrdersList(data);

      //   console.log(data);
    });

    // return () => {
    //   second;
    // };
  }, []);
  console.log(ordersList);
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
