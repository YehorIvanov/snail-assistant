import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectUser } from '../../redux/slices/userSlice';
import { useNavigate, useParams } from 'react-router';
import Product from './Product';
import getDocFromDB from '../../utils/getDocFromDB';
import setDocToDB from '../../utils/setDocToDB';
import './Order.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import deleteDocFromDB from '../../utils/deleteDocFromDB';
import { setError } from '../../redux/slices/errorSlice';
// import './Order.css';
const Order = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [order, setOrder] = useState({});
  const [addStock, setAddStock] = useState(false);

  useEffect(() => {
    getDocFromDB('orders', params.slug).then((data) => {
      console.log(data);
      setOrder(data);
    });
  }, [params.slug]);

  const handlerChangeAmount = (index, action, isStock) => {
    const updatedProducts = [...order.products];
    if (isStock) {
      updatedProducts[index].productStock += action;
      if (updatedProducts[index].productStock < 0)
        updatedProducts[index].productStock = 0;
    } else {
      updatedProducts[index].productAmount += action;
      if (updatedProducts[index].productAmount < 0)
        updatedProducts[index].productAmount = 0;
    }
    setOrder({ ...order, products: [...updatedProducts] });
  };
  const handlerCreateOrder = () => {
    if (!order.cafe) {
      dispatch(setError('Локація не вказана. Оберіть локацію для замовлення'));
      deleteDocFromDB('orders', order.docName);
      return;
    }
    const isNotEmptyOrder =
      order.products?.reduce((acc, product) => {
        return product.productAmount > 0 || product.productStock > 0
          ? (acc += 1)
          : acc;
      }, 0) > 0;
    if (isNotEmptyOrder) {
      setDocToDB('orders', order.docName, { ...order, admin: user.admin })
        .then(() => {
          console.log('ok');
          navigate('/orders');
        })
        .catch((e) => {
          console.log('error sending', e);
        });
    } else {
      deleteDocFromDB('orders', order.docName).then(navigate('/orders'));
      dispatch(setError('Замовлення порожне. Замовлення не створено! '));
    }
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
        value={order?.cafe}
        placeholder="Кав'ярня"
        onChange={handlerOnCafeChenge}
      >
        <option className="order_cafe-option" value="">
          Оберіть локацію
        </option>
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
      <label>
        <input
          type="checkbox"
          checked={addStock}
          onChange={() => {
            setAddStock(!addStock);
          }}
        />{' '}
        Подати залишки
      </label>
      {addStock && (
        <div className="order_tooltip">
          <span>Залишок</span> <span>Замовити</span>
        </div>
      )}
      {order.products &&
        order.products.map((product, i) => {
          return (
            <Product
              key={i}
              {...product}
              index={i}
              handler={handlerChangeAmount}
              addStock={addStock}
            />
          );
        })}

      <textarea placeholder="Коментар до замовлення" type="text" />

      <button onClick={handlerCreateOrder} className="order-button">
        ЗАМОВИТИ
      </button>
    </div>
  );
};

export default Order;
