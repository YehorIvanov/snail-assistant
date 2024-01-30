import React from 'react';
import signOut from '../../utils/signOut';
import Users from './Users';

const User = () => {
  return (
    <>
      <div className="user">
        <h2>User</h2>
        <button className="login_button" onClick={signOut}>
          Вийти
        </button>
      </div>
      <Users />
    </>
  );
};

export default User;
