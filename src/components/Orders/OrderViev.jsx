import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import getDocFromDB from '../../utils/getDocFromDB';
import timestampToTimestring from '../../utils/timestampToTimestring';
import { setDoc } from 'firebase/firestore';
import setDocToDB from '../../utils/setDocToDB';
import getDocsColectionFromDB from '../../utils/getDocsColectionFromDB';

const OrderViev = () => {
  const params = useParams();
  const [order, setOrder] = useState();
  useEffect(() => {
    getDocFromDB('orders', params.slug)
      .then((data) => {
        console.log(params.slug);
        setOrder(data);
      })
      .finally(() => {});
  }, []);
  console.log(order);

  const handlerChangeStatus = (status) => {
    setDocToDB(`orders`, order.docName, { ...order, status: status }).then(
      () => {
        setOrder({ ...order, status: status });
      }
    );
  };

  return (
    <div style={{ padding: '1rem 1rem 1rem', overflowY: 'auto' }}>
      <h4>{order?.name}</h4>
      <h5>Кафе: {order?.cafe}</h5>
      <h5>Адміністратор: {order?.admin}</h5>
      <h5>Створено: {timestampToTimestring(order?.lastUpdate)}</h5>
      <h5>Бариста: {order?.creator.name}</h5>
      <h5>Статус: {order?.status}</h5>
      <button onClick={() => handlerChangeStatus('прийнято')}>Прийнято</button>
      <div
      //   style={{ border: '1px solid', borderRadius: '1rem' }}
      >
        {order?.products.map((product, i) => {
          return (
            <div key={i}>
              <hr />
              <img
                src={product.productPhoto}
                alt={product.productNameame}
                style={{ width: '3rem', height: '3rem' }}
              />
              <h6>{product.productName}</h6>
              <span>
                {product.productStock}
                {product.productUnit}
              </span>
              <span>
                {product.productAmount}
                {product.productUnit}
              </span>
            </div>
          );
        })}
        <hr />
      </div>
      <button onClick={() => handlerChangeStatus('замовлено')}>
        Замовлено
      </button>
    </div>
  );
};

export default OrderViev;
