import React from 'react';
import signOut from '../../utils/signOut';

const User = () => {
  return (
    <div className="user">
      <h2>User</h2>
      <button className="login_button" onClick={signOut}>
        Вийти
      </button>
    </div>
  );
};

export default User;
