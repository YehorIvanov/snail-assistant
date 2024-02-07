import React from 'react';
import signOut from '../../utils/signOut';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/slices/userSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const User = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('isBarista: ', user.role.isBarista);
  console.log('isAdmin: ', user.role.isAdmin);
  console.log('isSuperadmin: ', user.role.isSuperadmin);

  const handlerOnBaristaClick = () => {
    dispatch(
      setUser({
        ...user,
        role: {
          ...user.role,
          isBarista: !user.role.isBarista,
        },
      })
    );
  };

  const handlerOnAdminClick = () => {
    dispatch(
      setUser({
        ...user,
        role: {
          ...user.role,
          isAdmin: !user.role.isAdmin,
        },
      })
    );
  };
  const handlerOnSuperadminClick = () => {
    dispatch(
      setUser({
        ...user,
        role: {
          ...user.role,
          isSuperadmin: !user.role.isSuperadmin,
        },
      })
    );
    console.log('isSuperadmin: ', user.role.isSuperadmin);
  };
  return (
    <>
      <div className="user">
        <div
          style={{
            padding: '1rem 1rem 1rem',
            borderRadius: '2rem',
            gap: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2.5rem',
              border: ' 0.3rem solid',
              height: '5rem',
              overflow: 'hidden',
            }}
          >
            <img
              src={user.userPhotoURL}
              alt="avatar"
              referrerPolicy="no-referrer"
              style={{ width: '5rem', height: '5rem', borderRadius: '50%' }}
            />
            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>
              {user.userName}
            </span>
            <button
              style={{
                width: '5rem',
                margin: '0 -0.3rem 0 auto',
                justifySelf: 'end',
              }}
              onClick={signOut}
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            justifyContent: 'flex-start',
            padding: '1rem',
          }}
        >
          <label>
            <input
              type="checkbox"
              checked={user.role.isBarista}
              onChange={handlerOnBaristaClick}
            />{' '}
            Barista
          </label>
          <label>
            <input
              type="checkbox"
              checked={user.role.isAdmin}
              onChange={handlerOnAdminClick}
            />{' '}
            Admin
          </label>
          <label>
            <input
              type="checkbox"
              checked={user.role.isSuperadmin}
              onChange={handlerOnSuperadminClick}
            />{' '}
            Superadmin
          </label>
        </div>
        <button
          onClick={() => {
            navigate('/user/users');
          }}
        >
          Керувати Користувачами
        </button>
      </div>
    </>
  );
};

export default User;
