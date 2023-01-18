import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : user ? (
        <div className="container mx-auto text-black">
          <MetaData title={`${user.name} -- Profile`} />
          <div
            className="grid grid-cols-2 mt-28 gap-10"
            style={{ minHeight: 'calc(90vh - 7rem)' }}
          >
            <div className="flex flex-col justify-evenly mx-auto max-w-xs">
              <h1 className="text-[2rem] font-semibold text-indigo-600 mb-4">
                My Profile
              </h1>
              <img
                src={user.avatar ? user.avatar.url : '/profile.png'}
                alt="Profile"
                className="rounded-md w-72"
              />
              <Link to="/me/update">
                <button className="hover:bg-indigo-700 mt-4 w-full mx-auto bg-indigo-600 text-white text-md px-5 py-2 rounded">
                  Edit Profile
                </button>
              </Link>
            </div>
            <div className="flex flex-col justify-evenly">
              <div className="mb-4"></div>
              <div className="mb-4">
                <h3 className="text-md font-semibold">Full Name</h3>
                <p className="text-md ">{user.name}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-md font-semibold">Email</h3>
                <p className="text-md ">{user.email}</p>
              </div>
              {user.createdAt && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold">Joined On</h3>
                  <p className="text-md ">{user.createdAt.substr(0, 10)}</p>
                </div>
              )}
              <Link
                to="/me/orders"
                className="mt-4 max-w-sm bg-gray-400 hover:bg-gray-500 text-white text-md px-5 py-2 rounded text-center"
              >
                My Orders
              </Link>

              <Link
                to="/me/password"
                className="mt-4 max-w-sm bg-gray-400 hover:bg-gray-500
                text-white text-md px-5 py-2 rounded text-center"
              >
                Change Password
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Profile;
