import React, { useEffect } from 'react';
import Product from './Product';
import { CgMouse } from 'react-icons/cg';
import MetaData from '../MetaData';
import { clearErrors, getProducts } from '../../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts());
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="Ecommerce App" />
      <div
        className="h-screen flex items-center justify-center flex-col gap-5 text-white font-Roboto"
        style={{
          background:
            'url(https://img.freepik.com/premium-photo/3d-rendering-illustration-laptop-computer-with-colorful-screen-keyboard-close-lid-place-darkroom-lighting-effect-image-presentation_37129-1523.jpg?w=996.jpg) center bottom no-repeat',
          backgroundSize: 'cover',
          clipPath: 'polygon(100% 0, 100% 75%, 50% 90%, 0 75%, 0 0)',
          zIndex: '8',
        }}
      >
        <h2 className="text-xl mb-3">Welcome To Ecommerce</h2>
        <h2
          className="text-3xl mb-3 font-bold mt-5 "
          style={{ letterSpacing: '0.07em' }}
        >
          FIND AMAZING PRODUCTS BELOW
        </h2>
        <a href="#products">
          <button className="flex items-center gap-2 border border-transparent bg-white text-black px-6 py-2 rounded hover:bg-transparent hover:text-white hover:border-white duration-500">
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <h2
            id="products"
            className="text-center mx-auto w-max px-8 border-b border-black font-medium text-lg font-Roboto pt-5"
          >
            Featured Products
          </h2>
          <div className="container mx-auto pt-12 flex flex-wrap gap-16 justify-center">
            {products
              ? products.map((product) => {
                  return <Product product={product} key={product._id} />;
                })
              : null}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
