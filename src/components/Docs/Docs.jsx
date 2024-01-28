import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrdersDesigns,
  subscribeToOrdersDesings,
} from '../../redux/slices/ordersDesingsSlise';
import { useEffect } from 'react';

const Docs = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersDesigns);
  useEffect(() => {
    dispatch(subscribeToOrdersDesings('ordersDesings'));
  }, [dispatch]);

  console.log('Orders: ', orders);
  return (
    <div>
      123
      {orders &&
        orders?.map((order) => (
          <div key={order.name}>
            <h3>{`Order #${order.name}`}</h3>
          </div>
        ))}
      <h3>Docs</h3>
      <p>Розділ з навчальними матеріалами. </p>
      <button>FAQ (дурні запитання швидкі відповіді)</button>
      <button>Технологічні карти</button>
      <button>Навчальні матеріали</button>
    </div>
  );
};

export default Docs;
