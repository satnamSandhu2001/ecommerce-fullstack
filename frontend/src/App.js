import React, { useEffect, useState } from 'react';
import store from './store';
import './App.css';
import Header from './component/layout/header/Header';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import WebFont from 'webfontloader';
import Home from './component/layout/home/Home';
import ProductDetails from './component/product/ProductDetails.js';
import Products from './component/product/Products';
import Search from './component/product/Search';
import LoginSignup from './component/user/LoginSignup';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/user/Profile';
import ProtectedRoute from './component/route/ProtectedRoute';
import AdminRoute from './component/route/AdminRoute';
import UpdatePofile from './component/user/UpdatePofile';
import UpdatePassword from './component/user/UpdatePassword';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';
import Cart from './component/cart/Cart';
import Shipping from './component/cart/Shipping';
import ConfirmOrder from './component/cart/ConfirmOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './component/cart/Payment';
import Success from './component/cart/Success';
import MyOrders from './component/order/MyOrders';
import OrderDetails from './component/order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductsList from './component/admin/ProductsList';
import Notfound from './component/layout/Notfound';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setstripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');
    setstripeApiKey(loadStripe(data.stripeapikey));
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Questrial', 'Roboto', 'Droid sans'],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // to disable right click
  window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        {/* user public routes */}
        <Route index element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        {/*   User Protected Routes  */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdatePofile />} />
          <Route path="/me/password" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          {stripeApiKey && (
            <Route
              path="/proceed/payment"
              element={
                <Elements stripe={stripeApiKey}>
                  <Payment />
                </Elements>
              }
            />
          )}
          <Route path="/success" element={<Success />} />
          <Route path="/me/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductsList />} />
        </Route>

        {/* not found page */}
        <Route path="*" element={<Navigate to="/404" replace />} />
        <Route path="/404" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
