import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MailOutline from '@mui/icons-material/MailOutline';
import FaceIcon from '@mui/icons-material/Face';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  updateProfile,
  loadUser,
  resetProfile,
} from '../../actions/userAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/loader/Loader';

const UpdatePofile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isUpdated, loading, error } = useSelector((state) => state.profile);

  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [avatar, setavatar] = useState('');
  const [avatarPreview, setavatarPreview] = useState('/profile.png');

  const alert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setemail(user.email);
      setname(user.name);
      if (user.avatar) {
        setavatar(user.avatar.url);
        setavatarPreview(user.avatar.url);
      }
    }
    if (isUpdated) {
      alert.success('Profile Updated');
      dispatch(loadUser());
      navigate('/account');
      setTimeout(() => {
        dispatch(resetProfile());
      }, 1000);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [user, isUpdated, navigate, alert, error, dispatch]);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const myForm = {
      name,
      email,
      avatar,
    };
    dispatch(updateProfile(myForm));
  };

  const handleAvatarChange = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (reader.readyState === 2) {
        setavatar(reader.result);
        setavatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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
                Update Profile
              </p>
              <div className="h-[2px] transition-transform duration-300 rounded-full bg-indigo-600 w-1/2 mx-auto"></div>
            </div>

            <form
              onSubmit={handleUpdateSubmit}
              className="px-5 flex flex-col justify-evenly h-full transition-transform duration-500"
            >
              {/*  name */}
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
                    setname(e.target.value);
                  }}
                />
              </div>
              {/* email */}
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
                    setemail(e.target.value);
                  }}
                />
              </div>

              <div className="flex items-center focus:bg-slate-500">
                <img
                  src={avatarPreview}
                  alt="Profile"
                  className="h-10 rounded-full"
                />
                <input
                  className="ml-3 h-full border w-full focus:outline-none hover:bg-gray-200 transition-colors duration-500"
                  id="avatar-input"
                  type="file"
                  accept="image/"
                  name="avatar"
                  onChange={(e) => {
                    handleAvatarChange(e);
                  }}
                />
              </div>

              <input
                className="bg-indigo-600 text-white py-2 rounded cursor-pointer hover:bg-indigo-700 duration-300"
                type="submit"
                value="Update Profile"
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatePofile;
