import { useEffect, useState } from 'react';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { Link, useNavigate } from 'react-router-dom';
import OrdersList from './OrdersList';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import setDocToDB from '../../utils/setDocToDB';

const Orders = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [ordersDesings, setOrdersDesings] = useState([]);
  useEffect(() => {
    getDocsColectionFromDB('ordersDesings').then((colection) => {
      setOrdersDesings(colection);
    });
  }, []);

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
      status: 'draft',
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
              <button
                key={order.slug}
                onClick={() => {
                  handlerNewOrder(order.slug);
                }}
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
            );
          })}
      </div>
      <hr />
      <Link to="/orders/desing-list">
        <button>Редагувати шаблони замовлень</button>
      </Link>

      <OrdersList />
    </div>
  );
};

export default Orders;
