import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../redux/slices/userSlice';
import { auth } from '../firebaseConfig';
import getDocFromDB from '../utils/getDocFromDB';
import MainLayout from './MainLayout';
import Login from './Login';
import Orders from './Orders';
import Main from './Main';
import Reports from './Reports';
import Docs from './Docs';
import User from './User';

const AppRouter = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!!currentUser && !!currentUser.email) {
        getDocFromDB('users', currentUser.email).then((userData) =>
          dispatch(setUser(userData))
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return !!user ? (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/user" element={<User />} />
        <Route path="/orders" element={<Orders />} />
        <Route index element={<Main />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/docs" element={<Docs />} />
      </Route>
      <Route
        path="*"
        element={
          <Link to="/">
            <h1>На Головну</h1>
          </Link>
        }
      />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Login />} />
        <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
