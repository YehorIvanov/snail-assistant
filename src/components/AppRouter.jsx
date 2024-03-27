import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../redux/slices/userSlice';
import { auth } from '../firebaseConfig';
import getDocFromDB from '../utils/getDocFromDB';
import MainLayout from './MainLayout';
import Login from './Login';
import Orders from './Orders/Orders';
import Main from './Main/Main';
import Reports from './Reports/Reports';
import Docs from './Docs/Docs';
import User from './User/User';
import Order from './Orders/Order';
import OrderDesigner from './Orders/OrderDesigner';
import OrderDesingList from './Orders/OrderDesingList';
import OrderView from './Orders/OrderView';
import UserEdit from './User/UserEdit';
import Users from './User/Users';
import { subscribeToUsers } from '../redux/slices/usersSlice';
import OrdersList from './Orders/OrdersList';
import CafeList from './User/CafeList';
import { setOrdersParams } from '../redux/slices/ordersSlice';
import { subscribeToCafe } from '../redux/slices/cafeSlice';
import { subscribeToOrdersDesings } from '../redux/slices/ordersDesingsSlise';
import CafeEdit from './User/CafeEdit';
import { subscribeToSchedule } from '../redux/slices/scheduleSlice';
import Recipe from './Docs/Recipe';
import RecipeList from './Docs/RecipeList';
import RecipeEdit from './Docs/RecipeEdit';
import { subscribeToRecipes } from '../redux/slices/recipesSlice';
import ArticlesList from './Docs/ArticlesList';
import ArticleEditor from './Docs/ArticleEditor';
import Article from './Docs/Article';

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

  useEffect(() => {
    if (user?.role.isBarista) {
      dispatch(
        setOrdersParams({ where1: ['creator.email', '==', user.email] })
      );
    }
    if (user?.role.isAdmin) {
      dispatch(setOrdersParams({ where1: ['admin.email', '==', user.email] }));
    }
    if (user?.role.isSuperadmin) {
      dispatch(setOrdersParams({ where1: '' }));
    }

    // if (user?.role.isBarista) {
    //   dispatch(
    //     setCafeParams({ where1: ['admin.email', '==', user.admin.email] })
    //   );
    // }
    // if (user?.role.isAdmin) {
    //   dispatch(setCafeParams({ where1: ['admin.email', '==', user.email] }));
    // }
    // if (user?.role.isSuperadmin) {
    //   dispatch(setCafeParams({ where1: '' }));
    // }
    dispatch(subscribeToSchedule());
    dispatch(subscribeToUsers());
    dispatch(subscribeToOrdersDesings());
    dispatch(subscribeToCafe());
    dispatch(subscribeToRecipes());
  }, [dispatch, user]);

  return !!user &&
    (!!user.role.isAdmin ||
      !!user.role.isSuperAdmin ||
      !!user.role.isBarista) ? (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/user" element={<User />} />
        <Route path="/user/edit-user/:slug" element={<UserEdit />} />
        <Route path="/user/users" element={<Users />} />
        <Route path="/user/cafe-list" element={<CafeList />} />
        <Route path="/user/cafe-edit/:slug" element={<CafeEdit />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:slug" element={<Order />} />
        <Route
          path="/orders/order-edite/:slug"
          element={<Order isEditeMode={true} />}
        />
        <Route path="/orders/viev/:slug" element={<OrderView />} />
        <Route path="/orders/orders-list" element={<OrdersList />} />
        <Route path="/orders/desing-list" element={<OrderDesingList />} />
        <Route
          path="/orders/order-desinger/:slug"
          element={<OrderDesigner />}
        />
        <Route index element={<Main />} />
        <Route path="/reports" element={<Reports />} />

        <Route path="/docs" element={<Docs />} />
        <Route path="/docs/recipe/:slug" element={<Recipe />} />
        <Route path="/docs/recipe-edit/:slug" element={<RecipeEdit />} />
        <Route path="/docs/recipes-list" element={<RecipeList />} />

        <Route path="/docs/article" element={<Article />} />
        <Route path="/docs/article-edit" element={<ArticleEditor />} />
        <Route path="/docs/articles-list" element={<ArticlesList />} />
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
      <Route path="/" element={<Login />}>
        <Route index element={<Login />} />
        <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
