
import OrderDesingList from './OrderDesingList';
import Order from './Order';

const Orders = () => {
  return (
    <div
      className="orders"
      style={{ overflowY: 'auto', padding: '2rem 1rem 6rem' }}
    >
      <h2>Orders</h2>
      <Order />
      <OrderDesingList />
      
    </div>
  );
};

export default Orders;
