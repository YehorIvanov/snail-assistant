import React from 'react';
import signOut from '../../utils/signOut';
import Users from './Users';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/userSlice';
import { FaSignOutAlt } from 'react-icons/fa';

const User = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <div className="user">
        {/* <h2>User</h2> */}
        <div
          style={{
            // backgroundColor: 'rgba(255,255,255, 0.1)',
            padding: '1rem 1rem 1rem',
            // margin: '1rem 1rem 1rem',
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
              // padding: '0.5rem',
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
      </div>
      <Users />
    </>
  );
};

export default User;
