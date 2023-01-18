import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartActions';
import CartItemCart from './CartItemCart';
import EmptyCart from '../../images/empty-cart.svg';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const incrementQuantityHandler = (id, quantity, stock) => {
    if (quantity >= stock) return;
    let newQty = quantity + 1;
    dispatch(addItemsToCart(id, newQty));
  };

  const decrementQuantityHandler = (id, quantity) => {
    if (quantity <= 1) return;
    let newQty = quantity - 1;
    dispatch(addItemsToCart(id, newQty));
  };

  const removeItem = (product) => {
    dispatch(removeItemsFromCart(product));
  };

  return (
    <>
      {cartItems.length !== 0 ? (
        <div className="container mx-auto mt-16">
          <div className="bg-indigo-600 grid grid-cols-[3fr_1fr_1fr] px-4 text-lg justify-between">
            <p className="text-white p-2 tracking-wider">Product</p>
            <p className="text-white p-2 tracking-wider">Quantity</p>
            <p className="text-white p-2 tracking-wider text-end">Subtotal</p>
          </div>
          <div className="w-full">
            {cartItems &&
              cartItems.map((item, i) => {
                return (
                  <div
                    key={i}
                    className="even:bg-slate-200 grid grid-cols-[3fr_1fr_1fr] px-4 py-2 my-4 text-lg items-center"
                  >
                    <CartItemCart item={item} removeItem={removeItem} />
                    <div className="flex items-center border-2 border-gray-400 rounded h-fit max-w-[110px]">
                      <button
                        onClick={() => {
                          decrementQuantityHandler(item.product, item.quantity);
                        }}
                        className="focus:outline-none flex items-center justify-center leading-none text-white bg-gray-400 px-3 py-2 hover:bg-gray-500 duration-500"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="focus:outline-none leading-none text-black bg-transparent min-w-[30px] w-full text-center"
                      />
                      <button
                        onClick={() => {
                          incrementQuantityHandler(
                            item.product,
                            item.quantity,
                            item.stock
                          );
                        }}
                        className="focus:outline-none flex items-center justify-center leading-none text-white bg-gray-400 px-3 py-2 hover:bg-gray-500 duration-500"
                      >
                        +
                      </button>
                    </div>
                    <p className="text-end">₹{item.price * item.quantity}</p>
                  </div>
                );
              })}
          </div>

          <div className="grid grid-cols-[3fr_1fr_1fr] px-4 mt-6 mb-4 text-lg">
            <span></span>
            <p className="border-t-2 border-indigo-600 py-2">Gross Total</p>
            <div className="border-t-2 border-indigo-600 py-2">
              <p className="text-end">{`₹${cartItems.reduce(
                (acc, item) => acc + item.quantity * item.price,
                0
              )}`}</p>
              <Link to="/login?redirect=shipping">
                <button className="ml-auto px-4 mt-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-base flex items-center justify-center leading-none text-white bg-gray-800 rounded py-3 hover:bg-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-briefcase mr-3"
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
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                    <line x1="12" y1="12" x2="12" y2="12.01" />
                    <path d="M3 13a20 20 0 0 0 18 0" />
                  </svg>
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-indigo-200 via-blue-200 to-indigo-300 mx-auto flex flex-col items-center justify-center h-screen text-center">
          <img src={EmptyCart} alt="Cart is Empty" className="max-w-sm" />
          <p className="text-3xl text-indigo-600 pt-6">Your Cart Is Empty!!</p>
          <Link to="/products">
            <button className="bg-gradient-to-tl from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-md text-lg mt-2 hover:from-blue-600 hover:to-indigo-600">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Cart;
