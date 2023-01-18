import React from 'react';

const Loader = () => {
  return (
    <>
      <div
        style={{ background: 'rgb(0 ,20, 255, 0.28)', zIndex: '500' }}
        className="font-Roboto flex gap-3 absolute overflow-hidden top-0 w-screen h-screen justify-center backdrop-blur-md items-center"
      >
        <div className="flex gap-2 w-max px-5 py-3 sm:shadow rounded-full my-12 items-center ">
          <p className="tracking-wider font-semibold text-white text-xl">
            Loading{' '}
          </p>
          <div
            className="bg-blue-600 p-2  w-4 h-4 rounded-full animate-bounce blue-circle"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="bg-green-600 p-2 w-4 h-4 rounded-full animate-bounce green-circle"
            style={{ animationDelay: '0.3s' }}
          ></div>
          <div
            className="bg-red-600 p-2  w-4 h-4 rounded-full animate-bounce red-circle"
            style={{ animationDelay: '0.5s' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Loader;
