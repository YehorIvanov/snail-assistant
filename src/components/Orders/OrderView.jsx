import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import timestampToTimestring from '../../utils/timestampToTimestring';
import setDocToDB from '../../utils/setDocToDB';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrders,
  subscribeToOrders,
} from '../../redux/slices/ordersSlice';
import './OrderView.css';
import UserLabel from '../User/UserLabel';
import { selectUser } from '../../redux/slices/userSlice';
import { FaCopy, FaReply } from 'react-icons/fa';
import copy from 'copy-to-clipboard';
const OrderViev = () => {
  const user = useSelector(selectUser);
  const params = useParams();
  const dispatch = useDispatch();
  const [showStock, setShowStock] = useState(true);
  const [showNull, setShowNull] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(subscribeToOrders());
  }, [dispatch]);

  const [order, setOrder] = useState();
  const ordersList = useSelector(selectOrders);

  useEffect(() => {
    setOrder(ordersList.filter((elem) => elem.docName === params.slug)[0]);
  }, [ordersList, params.slug]);

  useEffect(() => {
    if (order?.products) {
      setShowStock(
        order.products.filter((elem) => elem.productStock !== 0).length > 0
      );
    }
  }, [order]);

  const handlerChangeStatus = (status) => {
    setDocToDB(`orders`, order.docName, { ...order, status: status }).then(
      () => {
        setOrder({ ...order, status: status });
      }
    );
  };

  return (
    <div className="order-view">
      <div
        className="order-view_header"
        style={{
          backgroundImage: ` linear-gradient(175deg ,var(--accent-color) 5px,rgba(255, 255, 255, 0.2), #f1c6d8 90%), url(${order?.photo})`,
        }}
      >
        <h3 className="order-view_title">{order?.name}</h3>
        <h4 className="order-view_cafe"> {order?.cafe}</h4>
        <h5 className="order-view_status">{order?.status}</h5>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0 ',
          }}
        >
          <UserLabel {...order?.creator} />
          <div className="order-view_date">
            {timestampToTimestring(order?.lastUpdate)}
          </div>
        </div>
        <div className="order-view_button-block">
          <button
            className="order-view_button button-round"
            onClick={() => {
              copy(order.name);
            }}
          >
            <FaCopy />
          </button>
          <button
            className="order-view_button button-round"
            onClick={() => {
              navigate('/orders/orders-list');
            }}
          >
            <FaReply />
          </button>

          {user.role.isAdmin && (
            <>
              <button
                className="order-view_button"
                onClick={() => handlerChangeStatus('ЗАМОВЛЕНО')}
              >
                Замовлено
              </button>
              <button
                className="order-view_button"
                onClick={() => handlerChangeStatus('ПРИЙНЯТО')}
              >
                Прийняти
              </button>
            </>
          )}
          {user.role.isBarista &&
            order?.status === 'NEW' &&
            order?.creator.email === user.email && (
              <button
                className="order-view_button"
                onClick={() => navigate(`/orders/order-edite/${order.docName}`)}
              >
                редагувати
              </button>
            )}
        </div>

        <div className="order-viev_params">
          <label>
            <input
              type="checkbox"
              checked={showStock}
              onChange={() => setShowStock(!showStock)}
            />
            Залишки
          </label>
          <label>
            <input
              type="checkbox"
              checked={showNull}
              onChange={() => setShowNull(!showNull)}
            />
            Порожні
          </label>
        </div>
      </div>
      <div className="order-view_order">
        <p className="order-view_order-coment">
          <b>Коментар до замовлення: </b>
          {order?.coment}
        </p>
        <table>
          <thead>
            <tr>
              <td> </td>
              <td></td>
              {showStock && <td>Залишки</td>}
              <td>Замовлено</td>
            </tr>
          </thead>
          <tbody>
            {order?.products.map((product, i) => {
              if (!showNull && !product.productAmount) return null;
              return (
                <tr key={i}>
                  <td>
                    <img
                      src={product.productPhoto}
                      alt={product.productNameame}
                      style={{ width: '3rem', height: '3rem' }}
                    />
                  </td>
                  <td>{product.productName}</td>
                  {showStock && (
                    <td>
                      {product.productStock} {product.productUnit}
                    </td>
                  )}
                  <td>
                    {product.productAmount} {product.productUnit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="order-view_button-block">
          <button
            className="order-view_button button-round"
            onClick={() => {
              navigate('/orders/orders-list');
            }}
          >
            <FaReply />
          </button>

          {user.role.isAdmin && (
            <>
              <button
                className="order-view_button"
                onClick={() => handlerChangeStatus('ЗАМОВЛЕНО')}
              >
                Замовлено
              </button>
              <button
                className="order-view_button"
                onClick={() => handlerChangeStatus('ПРИЙНЯТО')}
              >
                Прийняти
              </button>
            </>
          )}
          {user.role.isBarista &&
            order?.status === 'NEW' &&
            order?.creator.email === user.email && (
              <button
                className="order-view_button"
                onClick={() => navigate(`/orders/${order?.docName}`)}
              >
                редагувати
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderViev;
