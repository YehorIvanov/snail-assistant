import React from 'react';
import signOut from '../../utils/signOut';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../redux/slices/userSlice';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import './User.css';
import getDocFromDB from '../../utils/getDocFromDB';
import setDocToDB from '../../utils/setDocToDB';
const User = () => {
  const user = useSelector(selectUser);
  // const users = useSelector(selectUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    console.log('isBarista: ', !user.role.isBarista);
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
    console.log('isAdmin: ', !user.role.isAdmin);
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
    console.log('isSuperadmin: ', !user.role.isSuperadmin);
  };
  const handleOnFakeLogin = () => {
    const email = prompt('fake login email');
    if (!email) return;
    getDocFromDB('users', email).then((user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        setDocToDB('users', email, {
          email: email,
          userName: '',
          firstName: '',
          lastName: '',
          tel: '',
          userPhotoURL: '',
          lastLogin: new Date().getTime(),
          admin: '',
          role: {
            isBarista: false,
            isAdmin: false,
            isSuperadmin: '',
            isGuest: true,
          },
        });
      }
    });
  };
  return (
    <>
      <div className="user">
        <div
          style={{
            borderRadius: '2rem',
            gap: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="user_info">
            <img
              className="user_avatar"
              src={user.userPhotoURL}
              alt="avatar"
              referrerPolicy="no-referrer"
            />
            <span>{user.userName}</span>
            <button className="user_exit-btn" onClick={signOut}>
              <FaSignOutAlt />
            </button>
          </div>
        </div>
        <div className="uaser_permissions">
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
          <div
            style={{
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              backgroundColor: 'var(--color',
            }}
            onDoubleClick={handleOnFakeLogin}
          ></div>
        </div>
        {(user.role.isAdmin || user.role.isSuperadmin) && (
          <button
            onClick={() => {
              navigate('/user/users');
            }}
          >
            Керувати Користувачами
          </button>
        )}

        {(user.role.isAdmin || user.role.isSuperadmin) && (
          <button
            onClick={() => {
              navigate('/user/cafe-list');
            }}
          >
            Керувати локаціями
          </button>
        )}
      </div>
    </>
  );
};

export default User;
