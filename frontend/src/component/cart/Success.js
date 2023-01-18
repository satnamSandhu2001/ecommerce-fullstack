import React from 'react';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MetaData from '../layout/MetaData';

const Success = () => {
  return (
    <>
      <MetaData title="Order Placed -- Ecommerce" />
      <div className="bg-gradient-to-br from-indigo-200 via-blue-200 to-indigo-300 mx-auto flex flex-col items-center justify-center h-screen text-center">
        <CheckCircleIcon
          style={{ fontSize: '6rem' }}
          className="text-indigo-600"
        />
        <h1 className="mt-4 mb-2 text-2xl">
          Your order has been placed successfully
        </h1>
        <Link to="/me/orders">
          <button className="bg-gradient-to-tl from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-md text-lg mt-2 hover:from-blue-600 hover:to-indigo-600">
            View Orders
          </button>
        </Link>
      </div>
    </>
  );
};

export default Success;
