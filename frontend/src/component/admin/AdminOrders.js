import React from 'react';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
const AdminOrders = () => {
  return (
    <>
      <MetaData title="Admin AdminOrders" />
      <div className="flex">
        <Sidebar activeTab={'#'} />
        <div className="w-full bg-gradient-to-tl from-indigo-100 to-blue-100">
          <div className="bg-white w-full py-6 shadow-sm sticky top-0">
            <h1 className="w-full text-center text-3xl text-indigo-600 tracking-wide">
              AdminOrders
            </h1>
          </div>
          <div className="p-6 rounded-md">dfhgfdhfgdgfdghfdg</div>
        </div>
      </div>
    </>
  );
};

export default AdminOrders;
