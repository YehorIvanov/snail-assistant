import { useEffect, useState } from 'react';
import getDocFromDB from '../../utils/getDocFromDB';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import Product from './Product';
import { useParams } from 'react-router';
import setDocToDB from '../../utils/setDocToDB';
const Order = () => {
  const params = useParams();
  const user = useSelector(selectUser);
  const [order, setOrder] = useState({});
  useEffect(() => {
    getDocFromDB('ordersDesings', params.slug).then((data) => {
      // console.log(data);
      setOrder({
        name: data.name,
        creator: { email: user.email, name: user.userName },
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
    updatedProducts[index].productAmount += action;
    if (updatedProducts[index].productAmount < 0)
      updatedProducts[index].productAmount = 0;
    setOrder({ ...order, products: [...updatedProducts] });
  };
  const handlerCreateOrder = () => {
    setDocToDB(
      'orders',
      `${new Date().getTime()}-${order.cafe}-${user.email}`,
      order
    )
      .then(() => {
        console.log('ok');
      })
      .catch((e) => {
        console.log('error sending', e);
      });

    // setDocToDB('orders', `${new Date().getTime()}`, order);
  };

  const handlerOnCafeChenge = (e) => {
    console.log(e.target.value);
    setOrder({ ...order, cafe: e.target.value });
  };

  return (
    <div className="order">
      <h2 className="order_title">{order.name}</h2>
      <select
        className="order_cafe-select"
        name=""
        id=""
        placeholder="Кав'ярня"
        onChange={handlerOnCafeChenge}
      >
        <option
          className="order_cafe-option"
          value="golden-gate"
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
      {order.products &&
        order.products.map((product, i) => {
          return (
            <Product
              key={i}
              {...product}
              index={i}
              handler={handlerChangeAmount}
            />
          );
        })}

      <button onClick={handlerCreateOrder} className="order-button">
        ЗАМОВИТИ
      </button>
    </div>
  );
};

export default Order;
