import { useEffect, useState } from 'react';
import getDocFromDB from '../utils/getDocFromDB';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import Product from './Product';
const Order = () => {
  const user = useSelector(selectUser);
  const [order, setOrder] = useState({});
  const [orderDesing, setOrderDesing] = useState({});
  useEffect(() => {
    getDocFromDB('ordersDesings', '123').then((data) => {
      setOrderDesing(data);
      setOrder({
        name: data.name,
        creator: { email: user.email, name: user.name },
        lastUpdate: new Date().getTime(),
        admin: '',
        cafe: '',
        products: [
          ...data.products.map((product) => {
            return { ...product, productAmount: 0, productStock: 0 };
          }),
        ],
        status: '',
      });
    });
  }, []);
  console.log(order);
  const handlerChangeAmount = (index, action) => {
    const updatedProducts = [...order.products];
    if (isNaN(updatedProducts[index].amount)) {
      updatedProducts[index].amount = 0;
    }
    updatedProducts[index].amount += action;
    if (updatedProducts[index].amount < 0) updatedProducts[index].amount = 0;
    setOrder({ ...order, products: [...updatedProducts] });
  };

  return (
    <div className="order">
      <h2 className="order_title">{order.name}</h2>
      <select
        className="order_cafe-select"
        name=""
        id=""
        placeholder="Кав'ярня"
      >
        <option
          className="order_cafe-option"
          value="Золоті Ворота"
          text="Золоті Ворота"
        >
          Золоті Ворота
        </option>
        <option
          className="order_cafe-option"
          value="Хрещатик 19"
          text="Хрещатик 19"
        >
          Хрещатик 19
        </option>
        <option
          className="order_cafe-option"
          value="Хрещатик 27"
          text="Хрещатик 27"
        >
          Хрещатик 27
        </option>
      </select>
      {orderDesing.products &&
        orderDesing.products.map((product, i) => {
          return (
            <Product
              key={i}
              {...product}
              index={i}
              handler={handlerChangeAmount}
            />
          );
        })}

      <button className="order-button">ЗАМОВИТИ</button>
    </div>
  );
};

export default Order;
