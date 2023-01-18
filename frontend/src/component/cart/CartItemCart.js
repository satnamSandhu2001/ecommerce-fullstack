import React from 'react';
import { Link } from 'react-router-dom';

const CartItemCart = ({ item, removeItem }) => {
  return (
    <div className="flex gap-4 text-base">
      <img src={item.image} alt="Product" className="w-16 rounded" />
      <div className="flex flex-col">
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <p
          onClick={() => removeItem(item.product)}
          className="text-red-600 cursor-pointer"
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItemCart;
