import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import timestampToTimestring from '../../utils/timestampToTimestring';
import getAvatarByEmail from '../../utils/getAvatarByEmail';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrders,
  subscribeToOrders,
} from '../../redux/slices/ordersSlice';
import { selectUsers } from '../../redux/slices/usersSlice';
import '../../img/1706184943469-2229696@gmail.com.jpeg';
import UserLabel from '../User/UserLabel';
const OrdersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeToOrders());
  }, [dispatch]);

  const ordersList = useSelector(selectOrders);
  const users = useSelector(selectUsers);

  return (
    <div
      style={{
        gap: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h4>Замовлення</h4>

      {ordersList.map((elem, i) => {
        return (
          <div
            className=""
            key={i}
            style={{
              border: '1px solid white',
              borderRadius: '1rem',
              padding: '1rem',
              gap: '1rem',
              display: 'flex',
              flexDirection: 'column',
              backgroundImage: `url(${elem.photo}), linear-gradient(45deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))`,
              backgroundBlendMode: 'overlay',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '1rem',
              }}
            >
              <Link
                style={{
                  color: 'var(--fuchsia)',
                  fontWeight: '600',
                  fontSize: '1.5rem',
                }}
                to={`/orders/viev/${elem.docName}`}
              >
                {elem.name}
              </Link>
              <span>{elem?.cafe ? elem.cafe : 'Назва Локації'}</span>
            </div>
            <span style={{ alignSelf: 'flex-end' }}>{elem.status}</span>
            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {/* <div
                  style={{
                    borderRadius: '1rem',
                    height: '2rem',
                    backgroundColor: 'var(--glas)',
                    display: 'inline-flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    padding: '0 0.5rem 0 0',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                  }}
                >
                  <img
                    src={getAvatarByEmail(elem.creator.email, users)}
                    alt="avatar"
                    referrerPolicy="no-referrer"
                    style={{
                      width: '2rem',
                      height: '2rem',
                      borderRadius: '50%',
                    }}
                  />
                  {elem.creator.name}
                </div> */}
                <UserLabel {...elem?.creator} />
                <span style={{ fontSize: '1.2rem' }}>
                  {timestampToTimestring(elem.lastUpdate)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrdersList;
