import React from 'react';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../redux/slices/usersSlice';

const UserLabel = ({ name, email }) => {
  const users = useSelector(selectUsers);
  const getAvatarByEmail = (email, users) => {
    try {
      let url = users.filter((elem) => elem.email === email)[0].userPhotoURL;
      if (url) return url;
      return '';
    } catch (e) {}
  };
  return (
    <div
      style={{
        borderRadius: '1.5rem',
        height: '3rem',
        backgroundColor: 'rgba(255,255,255,0.5)',
        display: 'inline-flex',
        gap: '1rem',
        alignItems: 'center',
        padding: '0 0.5rem 0 0',
        fontSize: '1.3rem',
        fontWeight: '600',
        border: ' 1px solid white',
      }}
    >
      <img
        src={getAvatarByEmail(email, users)}
        alt="avatar"
        referrerPolicy="no-referrer"
        style={{
          width: '2.8rem',
          height: '2.8rem',
          borderRadius: '50%',
          border: '1px solid white',
        }}
      />
      {name}
    </div>
  );
};

export default UserLabel;
