import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.5)',
    activeColor: 'tomato',
    size: window.innerWidth < 600 ? 15 : 20,
    value: product.rating,
    isHalf: true,
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="max-w-[220px] block hover:-translate-y-2 duration-300"
    >
      <img src={product.images[0].url} alt={product.name} className="w-full" />
      <div className="px-3 pt-2">
        <p className="text-lg font-semibold">{product.name}</p>
        <div className="flex gap-3 items-center">
          <ReactStars {...options} />{' '}
          <span> ({product.numOfReviews} Reviews) </span>
        </div>
        <span style={{ color: 'tomato' }} className="font-semibold">
          {`₹${product.price}`}
        </span>
      </div>
    </Link>
  );
};

export default Product;
