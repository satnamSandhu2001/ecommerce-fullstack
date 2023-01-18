import React, { useEffect, useState } from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import {
  clearErrors,
  forgotPassword,
  resetStateForgotPassword,
} from '../../actions/userAction';

const ForgotPassword = () => {
  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setemail] = useState('');

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch(resetStateForgotPassword());
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [message, error, alert, dispatch]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = { email };
    dispatch(forgotPassword(formData));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="h-screen w-screen bg-slate-200 flex items-center justify-center">
          <div className="bg-white w-80 h-[340px] pb-16 pt-2 rounded-md overflow-hidden">
            <div className="relative">
              <Link
                to="/login"
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
                Forgot Password
              </p>
              <div className="h-[2px] transition-transform duration-300 rounded-full bg-indigo-600 w-1/2 mx-auto"></div>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="px-5 flex flex-col justify-evenly h-full transition-transform duration-500"
            >
              <p className="text-gray-600 text-base font-thin">
                Enter your email and we’ll send a link on your email to reset
                your password.
              </p>
              {/*  old password */}
              <div className="flex border p-2 focus:bg-slate-500">
                <MailOutlineIcon className="text-gray-500" />
                <input
                  className="pl-3 w-full focus:outline-none"
                  type="email"
                  placeholder="Your email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value);
                  }}
                />
              </div>

              <input
                className="bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                type="submit"
                value="Send Link"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
