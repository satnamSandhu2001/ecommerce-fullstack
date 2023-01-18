import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { Doughnut, Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);

  // line chart data
  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['#4f46e5'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  // Doughnut chart data
  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [2, 5],
      },
    ],
  };

  return (
    <>
      <MetaData title="Admin Dashboard" />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex">
          <Sidebar activeTab={'dashboard'} />
          <div className="w-full bg-gradient-to-tl from-indigo-100 to-blue-100">
            {/* header */}
            <div className="bg-white w-full py-6 shadow-sm sticky top-0 grid grid-cols-[7fr_3fr] item-center">
              <h1 className="text-left px-6 text-3xl text-indigo-600 tracking-wide leading-normal">
                Dashboard
              </h1>
              <span className="flex bg-indigo-100 rounded-full whitespace-nowrap text-indigo-600 w-fit mr-20 items-center px-6 py-2 text-xl shadow-inner">
                <p>Total Amount : </p>&nbsp;{' '}
                <p className="font-Roboto">₹30000</p>
              </span>
            </div>
            {/* content body */}
            {products && (
              <div className="p-6 rounded-md text-black">
                <div className="flex items-center justify-evenly w-full gap-8">
                  <Link
                    to="/admin/products"
                    className="h-32 w-44 shadow-inner-2 hover:scale-150 transition-transform duration-500 cursor-pointer bg-red-400 rounded-full flex flex-col items-center justify-center"
                  >
                    <p className="text-xl">Product</p>
                    <span className="text-2xl">
                      {products && products.length}
                    </span>
                  </Link>
                  <div className="h-32 w-44 shadow-inner-2 hover:scale-150 transition-transform duration-500 cursor-pointer bg-indigo-400 rounded-full flex flex-col items-center justify-center">
                    <p className="text-xl">Orders</p>
                    <span className="text-2xl">16</span>
                  </div>
                  <div className="h-32 w-44 shadow-inner-2 hover:scale-150 transition-transform duration-500 cursor-pointer bg-green-400 rounded-full flex flex-col items-center justify-center">
                    <p className="text-xl">Users</p>
                    <span className="text-2xl">2</span>
                  </div>
                </div>

                {/* line chart */}
                <div className="mx-auto mt-10 w-4/5">
                  <Line data={lineState} className="mx-auto" />
                </div>

                {/* Doughnut chart */}
                <div className="mt-10 mx-auto w-max h-[500px]">
                  <Doughnut data={doughnutState} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
