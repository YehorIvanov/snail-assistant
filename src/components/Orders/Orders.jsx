import { useEffect, useState } from 'react';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [ordersDesings, setOrdersDesings] = useState([]);
  useEffect(() => {
    getDocsColectionFromDB('ordersDesings').then((colection) => {
      setOrdersDesings(colection);
    });
  }, []);
  console.log(ordersDesings);
  return (
    <div
      className="orders"
      style={{ overflowY: 'auto', padding: '2rem 1rem 6rem' }}
    >
      <h2>Orders</h2>
      <div>
        {ordersDesings
          .filter((order) => order.published)
          .map((order) => {
            return (
              <Link key={order.name} to={`/orders/${order.slug}`}>
                <button
                  style={{
                    backgroundImage: `url(${order.photo})`,
                    backgroundSize: 'cover',
                    width: '40%',
                    height: '16rem',
                    margin: '1rem',
                  }}
                >
                  {order.name}
                </button>
              </Link>
            );
          })}
      </div>
      <hr />
      <Link to="/orders/desing-list">
        <button>Редагувати шаблони замовлень</button>
      </Link>

      {/* <OrderDesingList /> */}
    </div>
  );
};

export default Orders;
