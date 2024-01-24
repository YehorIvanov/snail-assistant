import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { FaPencilAlt } from 'react-icons/fa';
import NewOrderDesing from './NewOrderDesing';

const OrderDesingList = () => {
  const [ordersDesings, setOrdersDesings] = useState([]);
  useEffect(() => {
    const fetchOrderDesignList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'ordersDesings'));
        setOrdersDesings(querySnapshot.docs.map((doc) => doc.data()));
      } catch (error) {
        console.error('Error fetching order design list:', error);
      }
    };
    fetchOrderDesignList();
  }, []);

  return (
    <div className="order-deing-list" style={{ padding: '1rem' }}>
      <h3>Шаблони замовлень</h3>
      <table className="u-full-width">
        <tbody>
          {ordersDesings.map((elem, i) => {
            return (
              <tr key={i}>
                <td>{elem.name}</td>
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
