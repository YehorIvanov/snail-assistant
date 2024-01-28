import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrdersDesigns,
  selectOrdersDesignsError,
  selectOrdersDesignsStatus,
  subscribeToOrders,
} from '../../redux/slices/ordersDesingsSlise';
import { useEffect } from 'react';

const Docs = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrdersDesigns);
  useEffect(() => {
    dispatch(subscribeToOrders('ordersDesings'));
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
    </div>
  );
};

export default Docs;

{
  /* {Object.keys(order.designs).map((designId) => (
  <p key={designId}>{`Design #${designId}`}</p>
))} */
}
{
  /* <h3>Docs</h3>
<p>Розділ з навчальними матеріалами. </p>
<button>FAQ (дурні запитання швидкі відповіді)</button>
<button>Технологічні карти</button>
<button>Навчальні матеріали</button> */
}
