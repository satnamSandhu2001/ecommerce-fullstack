import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  clearErrors,
  loadUser,
  resetPassword,
  resetStateResetPassword,
} from '../../actions/userAction';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockCloseIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Loader from '../layout/loader/Loader';

const ResetPassword = () => {
  const { success, loading, error } = useSelector(
    (state) => state.resetPassword
  );
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setpassword] = useState('');
  const [showpassword, setshowpassword] = useState('password');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [showconfirmPassword, setshowconfirmPassword] = useState('password');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Password Updated');
      dispatch(loadUser());
      dispatch(resetStateResetPassword());
      navigate('/account');
    }
  }, [error, alert, dispatch, success, navigate]);

  const handleResetFormSubmit = (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert.success('New Password must be greater than 7 characters');
      return;
    }
    if (password.length > 30) {
      alert.success('New Password must be smaller than 30 characters');
      return;
    }
    if (password !== confirmPassword) {
      alert.success('Password Doesn"t Match');
      return;
    }

    const formData = {
      password,
      confirmPassword,
    };

    dispatch(resetPassword(token, formData));
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
                Reset Password
              </p>
              <div className="h-[2px] transition-transform duration-300 rounded-full bg-indigo-600 w-1/2 mx-auto"></div>
            </div>

            <form
              onSubmit={handleResetFormSubmit}
              className="px-5 flex flex-col justify-evenly h-full transition-transform duration-500"
            >
              {/* new password */}
              <div className="flex border p-2 focus:bg-slate-500">
                <LockOpenIcon className="text-gray-500" />
                <input
                  className="pl-3 w-full focus:outline-none"
                  type={showpassword}
                  placeholder="New Password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                <span className="scale-75 cursor-pointer">
                  {showpassword === 'password' ? (
                    <VisibilityOffIcon
                      onClick={(e) => {
                        setshowpassword('text');
                      }}
                    />
                  ) : (
                    <VisibilityIcon
                      onClick={() => {
                        setshowpassword('password');
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
                  placeholder="Confirm Password"
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

export default ResetPassword;
