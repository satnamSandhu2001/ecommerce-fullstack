import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction, Backdrop, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import Loader from '../loader/Loader';

const UserOptions = ({ user }) => {
  const { loading } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setopen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  function dashboard() {
    navigate('/admin/dashboard');
    setopen(false);
  }
  function orders() {
    navigate('/me/orders');
    setopen(false);
  }
  function account() {
    navigate('/account');
    setopen(false);
  }
  function cart() {
    navigate('/cart');
    setopen(false);
  }
  function logoutUser() {
    dispatch(logout());
    alert.success('Logged Out');
    navigate('/login');
    setopen(false);
  }

  return (
    <>
      {loading ? <Loader /> : null}

      <Backdrop open={open} style={{ zIndex: '9998' }} />
      <SpeedDial
        ariaLabel="Speed Dial"
        onOpen={() => {
          setopen(true);
        }}
        direction="down"
        onClose={() => setopen(false)}
        open={open}
        icon={
          <div className="relative rounded-full h-full w-full bg-white">
            <img
              src={user.avatar ? user.avatar.url : '/profile.png'}
              alt="Profile"
              className="rounded-full h-full w-full bg-white"
            />
            {cartItems.length !== 0 && (
              <span className="absolute right-1 text-xs h-4 w-4 flex items-center justify-center top-0 bg-indigo-600 rounded-full text-white">
                {cartItems.length}
              </span>
            )}
          </div>
        }
        className="fixed top-4 right-4"
        style={{ zIndex: '9999' }}
      >
        {user.role === 'admin' ? (
          <SpeedDialAction
            icon={<DashboardIcon />}
            tooltipTitle={'Dashboard'}
            onClick={() => dashboard()}
          />
        ) : null}
        <SpeedDialAction
          icon={<ListAltIcon />}
          tooltipTitle={'Orders'}
          onClick={() => orders()}
        />
        <SpeedDialAction
          icon={
            <Badge badgeContent={cartItems.length} color="primary" max={100}>
              <ShoppingCartIcon />
            </Badge>
          }
          tooltipTitle={`Cart(${cartItems.length})`}
          onClick={() => cart()}
        />
        <SpeedDialAction
          icon={<PersonIcon />}
          tooltipTitle={'Account'}
          onClick={() => account()}
        />
        <SpeedDialAction
          icon={<ExitToAppIcon />}
          tooltipTitle={'Logout'}
          onClick={() => logoutUser()}
        />
      </SpeedDial>
    </>
  );
};

export default UserOptions;
