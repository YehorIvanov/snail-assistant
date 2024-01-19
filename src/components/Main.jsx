import Login from './Login';
import Order from './Order';
import OrderDesigner from './OrderDesigner';

const Main = () => {
  return (
    <main className="main">
      {/* <h2>main</h2> */}
      <OrderDesigner />
      {/* <Order /> */}

      <Login />
    </main>
  );
};

export default Main;
