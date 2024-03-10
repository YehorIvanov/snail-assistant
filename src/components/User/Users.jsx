import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, subscribeToUsers } from '../../redux/slices/usersSlice';
import { useEffect, useState } from 'react';
import { selectUser } from '../../redux/slices/userSlice';
import './Users.css';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import getUniqueAdminValues from '../../utils/getUniqueAdminValues';
const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(subscribeToUsers());
  }, [dispatch]);
  const [filteredUsers, setFilteredUsers] = useState(
    users.filter((elem) => elem.admin.email === user.email)
  );
  useEffect(() => {
    setFilteredUsers(users.filter((elem) => elem.admin.email === user.email));
  }, [user.email, users]);

  const handlerOnAdminChange = (admin) => {
    switch (admin) {
      case 'new':
        setFilteredUsers(users.filter((user) => user.admin === ''));
        break;
      case 'all':
        setFilteredUsers(users);
        break;
      case 'my':
        setFilteredUsers(
          users.filter((elem) => elem.admin.email === user.email)
        );
        break;
      default:
        setFilteredUsers(users.filter((user) => user.admin.email === admin));
        // console.log(admin);
        break;
    }
  };

  if ((!!user && !!user.role.isAdmin) || !!user.role.isSuperAdmin) {
    return (
      <div className="users">
        <h4 className="users_title">Користувачі</h4>

        <select
          className="users_filter-select"
          onChange={(e) => handlerOnAdminChange(e.target.value)}
        >
          <option value="my">Мої</option>
          {user.role.isSuperadmin && <option value="all">Всі</option>}
          <option value="new">Нові</option>
          {user.role.isSuperadmin &&
            getUniqueAdminValues(users).map((elem) => {
              return (
                <option key={elem.email} value={elem.email}>
                  {`Адміністратор: ${elem.userName}`}
                </option>
              );
            })}
        </select>

        {filteredUsers &&
          filteredUsers.map((user) => {
            return (
              <div className="users_user-box" key={user?.email}>
                <img
                  className="users_user-avatar"
                  src={user?.userPhotoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                  // style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
                />
                <div className="users_user-info">
                  <span>{user?.userName}</span> <span>{user?.email}</span>
                  <a
                    href={`tel:${user?.tel}`}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  >
                    {user?.tel}
                  </a>
                  <span>Адміністратор: {user?.admin.userName}</span>
                </div>
                <Link to={`/user/edit-user/${user.email}`}>
                  <button className="button-round">
                    <FaPencilAlt size="2rem" />
                  </button>
                </Link>
              </div>
            );
          })}
      </div>
    );
  }
};

export default Users;
