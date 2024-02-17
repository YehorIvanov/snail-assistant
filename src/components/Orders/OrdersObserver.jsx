import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { useEffect } from 'react';
import { selectCafeList } from '../../redux/slices/cafeSlice';
import {
  selectOrders,
  subscribeToOrders,
} from '../../redux/slices/ordersSlice';
import { selectOrdersDesigns } from '../../redux/slices/ordersDesingsSlise';
import './OrdersObserver.css';
import { Link } from 'react-router-dom';
import { unsetOrdersFilters } from '../../redux/slices/ordersFiltersSlice';
import { WiMoonAltFull, WiMoonFull } from 'react-icons/wi';
const OrdersObserver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(subscribeToOrders());
    dispatch(unsetOrdersFilters());
  }, [dispatch]);

  const user = useSelector(selectUser);
  const cafeList = useSelector(selectCafeList);
  const ordersDesings = useSelector(selectOrdersDesigns);
  const ordersList = useSelector(selectOrders);

  const getRepeatingLinearGradient = (columns, direction, color1, color2) => {
    const columnWidth = 100 / columns;
    let gradient = `repeating-linear-gradient(${direction},`;
    for (let i = 0; i < columns; i++) {
      const startPosition = i * columnWidth;
      const endPosition = (i + 1) * columnWidth;
      gradient += `${i % 2 === 0 ? color1 : color2} ${startPosition}%, ${
        i % 2 === 0 ? color1 : color2
      } ${endPosition}%${i < columns - 1 ? ',' : ''}`;
    }
    gradient += ')';
    return gradient;
  };

  if (user.role.isAdmin) {
    console.log(ordersDesings);
    return (
      <div
        className="orders-observer"
        style={{
          background: getRepeatingLinearGradient(
            ordersDesings.filter((desing) => desing.published).length,
            'to left',
            'var(--bg-color)',
            'var(--glas)'
          ),
        }}
      >
        <div className="orders-observer_header">
          {ordersDesings &&
            ordersDesings.map((desing) => {
              if (desing.published) {
                return (
                  <div
                    className="orders-observer_cell orders-observer_cell__header"
                    key={desing.name}
                  >
                    <Link to={`/orders/orders-list?name=${desing.name}`}>
                      {desing.name}
                    </Link>
                  </div>
                );
              }
              return null;
            })}
        </div>
        {cafeList &&
          cafeList.map((cafe) => {
            return (
              <div className="orders-observer_row" key={cafe.name}>
                <div>
                  <Link
                    className="orders-observer_cafe"
                    to={`/orders/orders-list/?cafe=${cafe?.name}`}
                  >
                    {cafe?.name}
                  </Link>
                </div>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  {ordersDesings.map((desing) => {
                    if (desing.published) {
                      return (
                        <div className="orders-observer_cell" key={desing.name}>
                          <Link
                            to={`/orders/orders-list/?cafe=${cafe?.name}&name=${desing.name}&notStatus=ЗАМОВЛЕНО`}
                          >
                            {ordersList.filter(
                              (order) =>
                                order.name === desing.name &&
                                (order.status === 'NEW' || 'ПРИЙНЯТО') &&
                                order.cafe === cafe.name
                            ).length > 0 ? (
                              <WiMoonFull />
                            ) : (
                              <WiMoonAltFull />
                            )}
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
};

export default OrdersObserver;
