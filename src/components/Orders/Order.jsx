import './Order.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Product from './Product';
import getDocFromDB from '../../utils/getDocFromDB';
import setDocToDB from '../../utils/setDocToDB';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import deleteDocFromDB from '../../utils/deleteDocFromDB';
import { setError } from '../../redux/slices/errorSlice';
import { selectCafeList, subscribeToCafe } from '../../redux/slices/cafeSlice';
import { FaReply } from 'react-icons/fa';

const Order = (props) => {
  const { isEditeMode } = props;
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [order, setOrder] = useState({});
  const [addStock, setAddStock] = useState(false);
  const cafeList = useSelector(selectCafeList);

  useEffect(() => {
    dispatch(subscribeToCafe());
  }, [dispatch]);

  useEffect(() => {
    if (isEditeMode) {
      getDocFromDB('orders', params.slug).then((data) => setOrder({ ...data }));
    } else {
      getDocFromDB('ordersDesings', params.slug).then((data) => {
        const newOrder = {
          ...data,
          creator: { email: user.email, name: user.userName },
          lastUpdate: new Date().getTime(),
          admin: '',
          cafe: '',
          coment: '',
          products: [
            ...data.products.map((product) => {
              return { ...product, productAmount: 0, productStock: 0 };
            }),
          ],
          status: 'NEW',
          docName: `${new Date().getTime()}-${user.email}`,
        };
        delete newOrder.published;
        setOrder(newOrder);
      });
    }
  }, [isEditeMode, params.slug, user.email, user.userName]);

  const handlerChangeAmount = (index, value, isStock) => {
    const updatedProducts = [...order.products];
    if (isStock) {
      updatedProducts[index].productStock = parseInt(value);
      if (updatedProducts[index].productStock < 0)
        updatedProducts[index].productStock = 0;
    } else {
      updatedProducts[index].productAmount = parseInt(value);
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
      {order.comentToBarista && (
        <p className="order_tooltip">{order?.comentToBarista}</p>
      )}
      <select
        className="order_cafe-select"
        value={order?.cafe}
        onChange={handlerOnCafeChenge}
      >
        <option className="order_cafe-option" value="">
          Оберіть локацію
        </option>
        {cafeList &&
          cafeList.map((cafe) => {
            return (
              <option key={cafe.name} className="order_cafe-option">
                {cafe.name}
              </option>
            );
          })}
      </select>
      <div className="order_buttons-block">
        <label>
          <input
            type="checkbox"
            checked={addStock}
            onChange={() => {
              setAddStock(!addStock);
            }}
          />
          Подати залишки
        </label>
        <button
          className=" button-round"
          onClick={() => {
            navigate('/orders');
          }}
        >
          <FaReply />
        </button>
      </div>

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

      <textarea
        placeholder="Коментар до замовлення"
        value={order.coment}
        onChange={(e) => setOrder({ ...order, coment: e.target.value })}
        type="text"
      />

      <button onClick={handlerCreateOrder} className="order-button">
        ЗАМОВИТИ
      </button>
    </div>
  );
};

export default Order;
