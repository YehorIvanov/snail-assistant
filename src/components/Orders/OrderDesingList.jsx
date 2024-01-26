import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import NewOrderDesing from './NewOrderDesing';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';
import { Link } from 'react-router-dom';

const OrderDesingList = () => {
  const [ordersDesings, setOrdersDesings] = useState([]);
  useEffect(() => {
    getDocsColectionFromDB('ordersDesings').then((colection) => {
      setOrdersDesings(colection);
    });
  }, []);

  return (
    <div className="order-deing-list" style={{ padding: '1rem' }}>
      <h3>Шаблони замовлень</h3>
      <table className="u-full-width">
        <tbody>
          {ordersDesings.map((elem, i) => {
            return (
              <tr key={i}>
                <td>
                  <Link to={`/orders/order-desinger/${elem.slug}`}>
                    {elem.name}
                  </Link>
                </td>
                <td>{elem.products.length}</td>
                <td>
                  <FaPencilAlt size="1rem" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <NewOrderDesing />
    </div>
  );
};

export default OrderDesingList;
