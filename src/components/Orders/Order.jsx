import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/slices/userSlice';
import { useNavigate, useParams } from 'react-router';
import Product from './Product';
import getDocFromDB from '../../utils/getDocFromDB';
import setDocToDB from '../../utils/setDocToDB';

const Order = () => {
  const params = useParams();
  const navigate = useNavigate();

  // const user = useSelector(selectUser);
  const [order, setOrder] = useState({});
  useEffect(() => {
    getDocFromDB('orders', params.slug).then((data) => {
      console.log(data);
      setOrder(data);
    });
  }, [params.slug]);
  const handlerChangeAmount = (index, action) => {
    const updatedProducts = [...order.products];
    updatedProducts[index].productAmount += action;
    if (updatedProducts[index].productAmount < 0)
      updatedProducts[index].productAmount = 0;
    setOrder({ ...order, products: [...updatedProducts] });
  };
  const handlerCreateOrder = () => {
    setDocToDB('orders', order.docName, order)
      .then(() => {
        console.log('ok');
        navigate('/orders');
      })
      .catch((e) => {
        console.log('error sending', e);
      });
  };

  const handlerOnCafeChenge = (e) => {
    console.log(e.target.value);
    setOrder({ ...order, cafe: e.target.value });
  };

  return (
    <div className="order">
      <h2 className="order_title">{order?.name}</h2>
      <select
        className="order_cafe-select"
        name=""
        id=""
        value={order?.cafe}
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
          text="Хрещатик 19"
          value="Хрещатик 19"
        >
          Хрещатик 19
        </option>
        <option className="order_cafe-option" value="Хрещатик 27">
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
