import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearErrors,
  getProductDetails,
  newReview,
} from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import ReviewCard from './ReviewCard';
import { addItemsToCart } from '../../actions/cartActions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from '@mui/material';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const [quantity, setquantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Review Submitted Successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    setquantity((prev) => prev - 1);
  };
  const increaseQuantity = () => {
    if (quantity >= product.stock) return;
    setquantity((prev) => prev + 1);
  };

  const addToCartHandler = () => {
    if (!isAuthenticated) {
      return alert.info('Please Login to continue shopping');
    }
    dispatch(addItemsToCart(id, quantity));
  };

  const submitReviewToggle = () => {
    if (open) {
      setOpen(false);
    } else {
      if (isAuthenticated) {
        setOpen(true);
      } else {
        alert.info('Please Login To Submit A Review');
      }
    }
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set('rating', rating);
    myForm.set('comment', comment);
    myForm.set('productId', id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  return (
    <>
      <MetaData title={`${product.name} -- E-commerce`} />

      {loading ? (
        <Loader />
      ) : (
        product && (
          <div className="container mx-auto">
            <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
              <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <Carousel
                  navButtonsAlwaysVisible={true}
                  animation="slide"
                  duration={1000}
                  navButtonsProps={{
                    style: {
                      opacity: 0.5,
                    },
                  }}
                >
                  {product.images &&
                    product.images.map((item, i) => {
                      return <img src={item.url} alt={`Slide ${i}`} key={i} />;
                    })}
                </Carousel>
              </div>
              <div className="md:hidden">
                {product.images && (
                  <img
                    className="w-full"
                    alt="Product"
                    src={product.images[0].url}
                  />
                )}
                <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                  <img
                    alt="img-tag-one"
                    className="md:w-48 md:h-48 w-full"
                    src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
                  />
                  <img
                    alt="img-tag-one"
                    className="md:w-48 md:h-48 w-full"
                    src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
                  />
                  <img
                    alt="img-tag-one"
                    className="md:w-48 md:h-48 w-full"
                    src="https://i.ibb.co/cYDrVGh/Rectangle-245.png"
                  />
                  <img
                    alt="img-tag-one"
                    className="md:w-48 md:h-48 w-full"
                    src="https://i.ibb.co/f17NXrW/Rectangle-244.png"
                  />
                </div>
              </div>
              <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b border-gray-200 pb-6">
                  <p className="text-sm uppercase leading-none text-gray-600">
                    {product.category}
                  </p>
                  <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2">
                    {product.name}
                  </h1>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                  <p className="text-sm leading-4 text-gray-800">Price</p>
                  <div className="flex items-center justify-center">
                    <p className="text-md leading-none text-green-600">
                      {`₹${product.price}`}
                    </p>
                  </div>
                </div>
                <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                  <span className="text-sm leading-4">
                    <ReactStars
                      edit={false}
                      color="rgba(20,20,20,0.5)"
                      activeColor="tomato"
                      size={window.innerWidth < 600 ? 20 : 25}
                      value={product.rating}
                      isHalf={true}
                    />{' '}
                  </span>
                  <div className="flex items-center justify-center">
                    <p className="text-md leading-none text-gray-600 mr-3">
                      ({product.numOfReviews} Reviews)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-[2fr_6fr_1fr] gap-2">
                  <div className="flex items-center border-2 border-gray-800 rounded">
                    <button
                      onClick={decreaseQuantity}
                      className="focus:outline-none text-base flex items-center justify-center leading-none text-white bg-gray-800 px-3 py-4 hover:bg-gray-700"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      readOnly
                      onChange={() => setquantity(quantity)}
                      className="focus:outline-none leading-none text-black bg-white min-w-[30px] w-full py-2 text-2xl font-semibold text-center"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="focus:outline-none text-base flex items-center justify-center leading-none text-white bg-gray-800 px-3 py-4 hover:bg-gray-700"
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 rounded w-full py-3 ${
                      product.stock <= 0 ? '' : 'hover:bg-gray-700'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-shopping-cart-plus mr-3"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="6" cy="19" r="2" />
                      <circle cx="17" cy="19" r="2" />
                      <path d="M17 17h-11v-14h-2" />
                      <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                      <path d="M15 6h6m-3 -3v6" />
                    </svg>
                    Add To Cart
                  </button>
                  <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-transparent rounded border-2 border-gray-800 w-full py-3 hover:bg-slate-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-heart"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="#000"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    </svg>
                  </button>
                </div>
                <div>
                  {product.stock === 0 ? (
                    <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-red-600 text-right mt-1">
                      Out of Stock
                    </p>
                  ) : product.stock < 3 ? (
                    <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-red-600 text-right mt-1">
                      {`Only  ${product.stock} left in Stock`}
                    </p>
                  ) : (
                    <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-green-600 text-right mt-1">{`${product.stock} in Stock`}</p>
                  )}
                  <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
                    {product.description}
                  </p>
                  <p className="text-base leading-4 my-4 text-gray-600">
                    Product Code: {product._id}
                  </p>
                </div>
                <button
                  onClick={submitReviewToggle}
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 rounded w-fit p-4 hover:bg-gray-700"
                >
                  Submit Review
                </button>
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <DialogTitle>Submit Review</DialogTitle>
                  <DialogContent className="flex flex-col gap-4">
                    <Rating
                      onChange={(e) => setRating(Number(e.target.value))}
                      value={Number(rating)}
                      size="large"
                    />

                    <textarea
                      className="border border-gray-400 shadow-inner rounded"
                      cols="30"
                      rows="5"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={submitReviewToggle} color="primary">
                      Cancel
                    </Button>
                    <Button
                      onClick={reviewSubmitHandler}
                      color="success"
                      className="bg-indigo-600"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
            <div>
              <h3 className="text-center mx-auto w-max px-8 border-b border-black font-medium text-lg font-Roboto pt-5">
                Product Reviews
              </h3>{' '}
              <div className="overflow-auto">
                {product.reviews ? (
                  <div className="flex my-7 gap-5">
                    {product.reviews.map((review, i) => {
                      return <ReviewCard key={i} review={review} />;
                    })}
                  </div>
                ) : (
                  <p className="text-center mx-auto mt-6 text-gray-600 font-Roboto">
                    No Reviews Yet!
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProductDetails;
