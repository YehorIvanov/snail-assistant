import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, subscribeToUsers } from '../../redux/slices/usersSlice';
import { useEffect } from 'react';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(subscribeToUsers());
  }, [dispatch]);
  console.log(users);
  return (
    <div>
      <h3>Users</h3>
      {users &&
        users.map((user) => {
          return (
            <div key={user.email}>
              <img
                src={user.userPhotoURL}
                alt="avatar"
                referrerPolicy="no-referrer"
                style={{ width: '2rem', height: '2rem', borderRadius: '50%' }}
              />
              {user.userName}
            </div>
          );
        })}
    </div>
  );
};

export default Users;
