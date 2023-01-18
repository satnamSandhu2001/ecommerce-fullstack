import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  clearErrors,
  loadUser,
  resetProfile,
  updatePassword,
} from '../../actions/userAction';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockCloseIcon from '@mui/icons-material/Lock';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Loader from '../layout/loader/Loader';

const UpdatePassword = () => {
  const { isUpdated, loading, error } = useSelector((state) => state.profile);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [oldPassword, setoldPassword] = useState('');
  const [showoldPassword, setshowoldPassword] = useState('password');
  const [newPassword, setnewPassword] = useState('');
  const [shownewPassword, setshownewPassword] = useState('password');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [showconfirmPassword, setshowconfirmPassword] = useState('password');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Profile Updated');
      dispatch(loadUser());
      navigate('/account');
      setTimeout(() => {
        dispatch(resetProfile());
      }, 1000);
    }
  }, [error, alert, dispatch, isUpdated, navigate]);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      alert.success('New Password must be greater than 7 characters');
      return;
    }
    if (newPassword.length > 30) {
      alert.success('New Password must be smaller than 30 characters');
      return;
    }

    const formData = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    dispatch(updatePassword(formData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen w-screen bg-slate-200 flex items-center justify-center">
          <div className="bg-white w-80 h-[440px] pb-16 pt-2 rounded-md overflow-hidden">
            <div className="relative">
              <Link
                to="/account"
                className="absolute top-2 left-5 bg-slate-200 hover:bg-slate-300 p-1 rounded text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-back-up text-indigo-600"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                  stroke="#4546ef"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 13l-4 -4l4 -4m-4 4h11a4 4 0 0 1 0 8h-1" />
                </svg>
              </Link>
              <p className="text-lg py-2 tracking-wider text-center">
                Update Password
              </p>
              <div className="h-[2px] transition-transform duration-300 rounded-full bg-indigo-600 w-1/2 mx-auto"></div>
            </div>

            <form
              onSubmit={handleUpdateSubmit}
              className="px-5 flex flex-col justify-evenly h-full transition-transform duration-500"
            >
              {/*  old password */}
              <div className="flex border p-2 focus:bg-slate-500">
                <VpnKeyIcon className="text-gray-500" />
                <input
                  className="pl-3 w-full focus:outline-none"
                  type={showoldPassword}
                  placeholder="Old Password"
                  name="oldPassword"
                  required
                  value={oldPassword}
                  onChange={(e) => {
                    setoldPassword(e.target.value);
                  }}
                />
                <span className="scale-75 cursor-pointer">
                  {showoldPassword === 'password' ? (
                    <VisibilityOffIcon
                      onClick={(e) => {
                        setshowoldPassword('text');
                      }}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => {
                        setshowoldPassword('password');
                      }}
                    />
                  )}
                </span>
              </div>
              {/* new password */}
              <div className="flex border p-2 focus:bg-slate-500">
                <LockOpenIcon className="text-gray-500" />
                <input
                  className="pl-3 w-full focus:outline-none"
                  type={shownewPassword}
                  placeholder="New Password"
                  name="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setnewPassword(e.target.value);
                  }}
                />
                <span className="scale-75 cursor-pointer">
                  {shownewPassword === 'password' ? (
                    <VisibilityOffIcon
                      onClick={(e) => {
                        setshownewPassword('text');
                      }}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => {
                        setshownewPassword('password');
                      }}
                    />
                  )}
                </span>
              </div>
              {/* confirm password */}
              <div className="flex border p-2 focus:bg-slate-500">
                <LockCloseIcon className="text-gray-500" />
                <input
                  className="pl-3 w-full focus:outline-none"
                  type={showconfirmPassword}
                  placeholder="Confirm New Password"
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setconfirmPassword(e.target.value);
                  }}
                />
                <span className="scale-75 cursor-pointer">
                  {showconfirmPassword === 'password' ? (
                    <VisibilityOffIcon
                      onClick={(e) => {
                        setshowconfirmPassword('text');
                      }}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => {
                        setshowconfirmPassword('password');
                      }}
                    />
                  )}
                </span>
              </div>

              <input
                className="bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                type="submit"
                value="Update Password"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
