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
        <div className="login_logo-box">
          <GiSnail size="12rem" />
          <h3 className="login_title">assistant</h3>
        </div>
        <p>
          Ви увійшли як{' '}
          <span style={{ color: 'var(--accent-color)' }}>{user.userName}</span>{' '}
          для надяння доступу зверніться до свого адміністратора
        </p>
        <button className="login_button" onClick={signOut}>
          Вийти
        </button>
      </div>
    );
  }
  return (
    <div className="login">
      <div className="login_logo-box">
        <GiSnail size="12rem" />
        <h3 className="login_title">assistant</h3>
      </div>
      <button className="login_button" onClick={signInWithGoogle}>
        Увійти з Google
      </button>
    </div>
  );
};

export default Login;
