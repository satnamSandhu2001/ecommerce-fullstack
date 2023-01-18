import React from 'react';
import MetaData from './MetaData';
import Icon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <>
      <MetaData title="404 Page Not Found - Ecommerce" />
      <div className="bg-gradient-to-br from-indigo-200 via-blue-200 to-indigo-300 mx-auto flex flex-col items-center justify-center h-screen text-center">
        <Icon style={{ fontSize: '6rem' }} className="text-indigo-600" />
        <h2 className="text-[10rem] font-Roboto font-black text-orange-600 leading-none">
          404
        </h2>
        <h1 className="mt-4 mb-2 text-3xl">Page Not Found!!</h1>
        <Link to="/products">
          <button className="bg-gradient-to-tl from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-md text-lg mt-2 hover:from-blue-600 hover:to-indigo-600">
            View Products
          </button>
        </Link>
      </div>
    </>
  );
};

export default Notfound;
