import { useDispatch, useSelector } from 'react-redux';
import {
  selectOrdersFilters,
  setOrdersFilters,
} from '../../redux/slices/ordersFiltersSlice';
import { selectOrders } from '../../redux/slices/ordersSlice';
import { selectUser } from '../../redux/slices/userSlice';
import { FaReply } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const OrdersFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectOrdersFilters);
  const ordersList = useSelector(selectOrders);
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const getUniqueBarista = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.creator.name && uniqueValues.add(order.creator.name);
    });
    return Array.from(uniqueValues);
  };
  const getUniqueCafe = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.cafe && uniqueValues.add(order.cafe);
    });
    return Array.from(uniqueValues);
  };
  const getUniqueStatus = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.status && uniqueValues.add(order.status);
    });
    return Array.from(uniqueValues);
  };
  const getUniqueAdmin = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.admin.userName && uniqueValues.add(order.admin.userName);
    });
    return Array.from(uniqueValues);
  };
  const getUniqueOrderTypes = (ordersList) => {
    const uniqueValues = new Set();
    ordersList.forEach((order) => {
      order.name && uniqueValues.add(order.name);
    });
    return Array.from(uniqueValues);
  };

  return (
    <div className="orders-list_filters">
      <div className="orders-list_filter-group">
        {user.role.isSuperadmin && (
          <select
            value={filters.admin}
            onChange={(e) =>
              dispatch(setOrdersFilters({ ...filters, admin: e.target.value }))
            }
          >
            <option value="">admin</option>
            {ordersList &&
              getUniqueAdmin(ordersList).map((admin) => {
                return (
                  <option key={admin} value={admin}>
                    {admin}
                  </option>
                );
              })}
          </select>
        )}
        <select
          value={filters.name}
          onChange={(e) =>
            dispatch(setOrdersFilters({ ...filters, name: e.target.value }))
          }
        >
          <option value="">Тип замовлення</option>
          {ordersList &&
            getUniqueOrderTypes(ordersList).map((name) => {
              return (
                <option key={name} value={name}>
                  {name}
                </option>
              );
            })}
        </select>

        <select
          value={filters.cafe}
          onChange={(e) =>
            dispatch(setOrdersFilters({ ...filters, cafe: e.target.value }))
          }
        >
          <option value="">Локація</option>
          {ordersList &&
            getUniqueCafe(ordersList).map((cafe) => {
              return (
                <option key={cafe} value={cafe}>
                  {cafe}
                </option>
              );
            })}
        </select>
      </div>
      <div className="orders-list_filter-group">
        <select
          value={filters.barista}
          onChange={(e) =>
            dispatch(setOrdersFilters({ ...filters, barista: e.target.value }))
          }
        >
          <option value="">Бариста</option>
          {ordersList &&
            getUniqueBarista(ordersList).map((barista) => {
              return (
                <option key={barista} value={barista}>
                  {barista}
                </option>
              );
            })}
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            dispatch(setOrdersFilters({ ...filters, status: e.target.value }))
          }
        >
          <option value="">Стан</option>
          {ordersList &&
            getUniqueStatus(ordersList).map((status) => {
              return (
                <option key={status} value={status}>
                  {status}
                </option>
              );
            })}
        </select>
        <button
          className="order-view_button button-round"
          onClick={() => {
            navigate('/orders');
          }}
        >
          <FaReply />
        </button>
      </div>
    </div>
  );
};

export default OrdersFilters;
