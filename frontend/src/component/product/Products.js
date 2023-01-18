import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProducts } from '../../actions/productAction';
import Product from '../layout/home/Product';
import Loader from '../layout/loader/Loader';
import Pagination from 'react-js-pagination';
import '../../App.css';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MetaData from '../layout/MetaData';

const categories = [
  'Laptop',
  'Gaming',
  'Clothes',
  'Footwear',
  'Bottom',
  'Camera',
  'Smartphone',
];

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setprice] = useState([0, 5000]);
  const [category, setcategory] = useState('');
  const [rating, setrating] = useState(0);

  const {
    error,
    loading,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
  } = useSelector((state) => state.products);
  const alert = useAlert();
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setcurrentPage(e);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, category, rating));
  }, [error, dispatch, alert, currentPage, keyword, price, category, rating]);

  const priceHandler = (event, newPrice) => {
    setprice(newPrice);
  };

  let count = filteredProductCount;

  return (
    <>
      <div>
        <MetaData title="E-commerce Products" />
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="container mx-auto mt-8 mb-16">
              <h2
                id="products"
                className="mb-8 text-center mx-auto w-max px-8 border-b border-black font-medium text-lg font-Roboto pt-5"
              >
                Featured Products
              </h2>
              <div className="md:grid md:grid-cols-[1fr_7fr] md:gap-8">
                <div className="mr-6">
                  <div>
                    <Typography color="initial">Price</Typography>
                    <Slider
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="on"
                      aria-labelledby="range-slider"
                      min={0}
                      max={5000}
                      disableSwap
                      size="small"
                      step={5000 / 100}
                    />
                  </div>
                  <div>
                    <Typography>Category</Typography>
                    <ul className="list-none">
                      {categories &&
                        categories.map((c) => {
                          return (
                            <li
                              onClick={() => setcategory(c)}
                              key={c}
                              className="text-sm cursor-pointer"
                            >
                              {c}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <fieldset className="border border-black px-2">
                    <Typography component="legend" variant="body2">
                      Rating Above
                    </Typography>
                    <Slider
                      value={rating}
                      onChange={(e, newRating) => {
                        setrating(newRating);
                        console.log(newRating);
                        console.log(e.target.value);
                      }}
                      valueLabelDisplay="auto"
                      aria-labelledby="continuous-slider"
                      min={0}
                      max={5}
                      size="small"
                    />
                  </fieldset>
                </div>

                <div>
                  <div className="flex justify-between flex-wrap gap-5">
                    {products &&
                      products.map((product, i) => {
                        return <Product key={i} product={product} />;
                      })}
                  </div>
                  {resultPerPage < count && (
                    <div>
                      {productsCount && (
                        <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={resultPerPage}
                          totalItemsCount={productsCount}
                          onChange={setCurrentPageNo}
                          nextPageText="Next"
                          prevPageText="Prev"
                          firstPageText="1st"
                          lastPageText="Last"
                          itemClass="page-item"
                          linkClass="page-link"
                          activeClass="pageItemActive"
                          activeLinkClass="pageLinkActive"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Products;
