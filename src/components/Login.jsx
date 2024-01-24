import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { GiSnail } from 'react-icons/gi';
import signOut from '../utils/signOut';
import signInWithGoogle from '../utils/signIn';

const Login = () => {
  const user = useSelector(selectUser);
  if (user) {
    return (
      <div className="login">
        <img
          className="login_avatar"
          src={user.userPhotoURL}
          alt="User avatar"
          referrerPolicy="no-referrer"
        />
        <h4 className="login_username">{user && user.userName}</h4>
        <button className="login_button" onClick={signOut}>
          Вийти
        </button>
      </div>
    );
  }
  return (
    <div className="login">
      <h2 className="login_title">
        <GiSnail size="12rem" />
      </h2>
      <button className="login_button" onClick={signInWithGoogle}>
        Увійти з Google
      </button>
    </div>
  );
};

export default Login;
