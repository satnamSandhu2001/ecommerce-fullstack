import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MailOutline from '@mui/icons-material/MailOutline';
import LockOpen from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors, register } from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/loader/Loader';

const LoginSignup = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const alert = useAlert();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const [loginPasswordType, setloginPasswordType] = useState('password');
  const [avatarPreview, setavatarPreview] = useState('/profile.png');
  const [avatar, setavatar] = useState('');
  const [userDetails, setuserDetails] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [registerPasswordType, setregisterPasswordType] = useState('password');
  const { name, email, password } = userDetails;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.set('name', name);
    // formData.set('email', email);
    // formData.set('password', password);
    // formData.set('avatar', avatar);
    let formData = {
      name,
      email,
      password,
      avatar,
    };
    dispatch(register(formData));
  };

  const redirect = location.search
    ? `/${location.search.split('=')[1]}`
    : '/account';

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated === true) {
      navigate(redirect);
    }
  }, [error, dispatch, alert, isAuthenticated, navigate, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === 'login') {
      switcherTab.current.classList.add('translate-x-[0%]');
      switcherTab.current.classList.remove('translate-x-[100%]');

      loginTab.current.classList.add('translate-x-[0%]', 'scale-100');
      loginTab.current.classList.remove('-translate-x-[100%]', 'scale-0');

      registerTab.current.classList.add('translate-x-[100%]', 'scale-0');
      registerTab.current.classList.remove('translate-x-[0%]', 'scale-100');
    }
    if (tab === 'register') {
      switcherTab.current.classList.add('translate-x-[100%]');
      switcherTab.current.classList.remove('translate-x-[0%]');

      loginTab.current.classList.add('-translate-x-[100%]', 'scale-0');
      loginTab.current.classList.remove('translate-x-[0%]', 'scale-100');

      registerTab.current.classList.add('translate-x-[0%]', 'scale-100');
      registerTab.current.classList.remove('translate-x-[100%]', 'scale-0');
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setavatarPreview(reader.result);
          setavatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }
  };
  return (
    <>
      {loading ? <Loader /> : null}
      <div className="h-screen w-screen bg-slate-200 flex items-center justify-center">
        <div className="bg-white w-80 h-[440px] pb-16 pt-2 rounded-md overflow-hidden">
          <div>
            <div className="grid grid-cols-2 items-center text-center">
              <p
                className="text-lg py-2 tracking-wider cursor-pointer"
                onClick={(e) => {
                  switchTabs(e, 'login');
                }}
              >
                LOGIN
              </p>
              <p
                className="text-lg py-2 tracking-wider cursor-pointer"
                onClick={(e) => {
                  switchTabs(e, 'register');
                }}
              >
                REGISTER
              </p>
            </div>
            <div
              ref={switcherTab}
              className="h-[2px] transition-transform duration-300 rounded-full bg-indigo-600 w-1/2 translate-x-[0%]"
            ></div>
          </div>
          <form
            ref={loginTab}
            onSubmit={loginSubmit}
            className="scale-100 px-5 flex flex-col justify-evenly h-full transition-transform duration-500"
          >
            {/* login email */}
            <div className="flex border p-2 focus:bg-slate-500">
              <MailOutline className="text-gray-500" />
              <input
                className="pl-3 w-full focus:outline-none"
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setloginEmail(e.target.value)}
              />
            </div>
            {/* login password */}
            <div className="flex border p-2 focus:bg-slate-500">
              <LockOpen className="text-gray-500" />
              <input
                className="pl-3 w-full focus:outline-none"
                type={loginPasswordType}
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setloginPassword(e.target.value)}
              />
              <span className="scale-75 cursor-pointer">
                {loginPasswordType === 'password' ? (
                  <VisibilityOffIcon
                    onClick={(e) => {
                      setloginPasswordType('text');
                    }}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={() => {
                      setloginPasswordType('password');
                    }}
                  />
                )}
              </span>
            </div>
            <Link
              to="/password/forgot"
              className="text-right text-sm text-gray-600"
            >
              Forget Password ?
            </Link>
            <input
              className="bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700 duration-300"
              type="submit"
              value="Login"
            />
          </form>
          <form
            ref={registerTab}
            onSubmit={registerSubmit}
            className="scale-0 px-5 flex flex-col justify-evenly h-full -translate-y-[100%] translate-x-[100%] transition-transform duration-500"
          >
            {/* login email */}
            <div className="flex border p-2 focus:bg-slate-500">
              <FaceIcon className="text-gray-500" />
              <input
                className="pl-3 w-full focus:outline-none"
                type="text"
                placeholder="Name"
                name="name"
                required
                value={name}
                onChange={(e) => {
                  registerDataChange(e);
                }}
              />
            </div>
            <div className="flex border p-2 focus:bg-slate-500">
              <MailOutline className="text-gray-500" />
              <input
                className="pl-3 w-full focus:outline-none"
                type="email"
                placeholder="Email"
                name="email"
                required
                value={email}
                onChange={(e) => {
                  registerDataChange(e);
                }}
              />
            </div>
            {/* login password */}
            <div className="flex border p-2 focus:bg-slate-500">
              <LockOpen className="text-gray-500" />
              <input
                className="pl-3 w-full focus:outline-none"
                type={registerPasswordType}
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={(e) => {
                  registerDataChange(e);
                }}
              />
              <span className="scale-75 cursor-pointer">
                {registerPasswordType === 'password' ? (
                  <VisibilityOffIcon
                    onClick={(e) => {
                      setregisterPasswordType('text');
                    }}
                  />
                ) : (
                  <VisibilityIcon
                    onClick={() => {
                      setregisterPasswordType('password');
                    }}
                  />
                )}
              </span>
            </div>
            <div className="flex items-center focus:bg-slate-500">
              <img
                src={avatarPreview}
                alt="UserDetails Avatar"
                className="h-10 rounded-full"
              />
              <input
                className="ml-3 h-full border w-full focus:outline-none hover:bg-gray-200 transition-colors duration-500"
                id="avatar-input"
                type="file"
                accept="image/"
                name="avatar"
                onChange={(e) => {
                  registerDataChange(e);
                }}
              />
            </div>

            <input
              className="bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700 duration-300"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginSignup;
