import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem('orderInfo', JSON.stringify(data));
    navigate('/proceed/payment');
  };

  return (
    <>
      <MetaData title="Confirm Order -- Ecommerce" />
      <div className="mt-8 mx-16">
        <CheckoutSteps activeStep={1} />
        <div className="md:grid md:grid-cols-[7fr_4fr] mt-8">
          <div className="border-r-2 border-gray-400">
            <div className="mb-6">
              <h2 className="text-2xl mb-4">Shipping Info</h2>
              <div className="mx-8">
                <div className="text-lg flex items-center">
                  <p>Name : &nbsp;</p> <span>{user.name}</span>
                </div>
                <div className="text-lg flex items-center">
                  <p>Phone : &nbsp;</p> <span>{shippingInfo.phoneNo}</span>
                </div>
                <div className="text-lg flex items-center">
                  <p>Address : &nbsp;</p> <span>{address}</span>
                </div>
              </div>
            </div>
            <h2 className="text-2xl mb-4">Your Cart Items</h2>
            <div className="overflow-y-auto max-h-60">
              {cartItems &&
                cartItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center my-3 ml-8 border-b hover:bg-slate-100"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt="Product"
                        className="mr-8 w-12"
                      />
                      <p className="text-lg">{item.name}</p>
                    </div>
                    <div className="mr-6">
                      <p className="text-lg">
                        {item.quantity} X ₹{item.price} &nbsp; = &nbsp; ₹
                        {item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-3/5 mx-auto md:pt-6 lg:pt-10">
            <h2 className="text-center text-2xl mb-2 pb-2 border-b border-gray-400">
              Order Summary
            </h2>
            <div>
              <div className="text-lg flex justify-between items-center my-3 py-3">
                <p>Subtotal : &nbsp;</p>
                <span>₹{subtotal}</span>
              </div>
              <div className="text-lg flex justify-between items-center my-3 py-3">
                <p>Shipping Charges : &nbsp;</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div className="text-lg flex justify-between items-center my-3 py-3">
                <p>GST : &nbsp;</p>
                <span>₹{Number(tax).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-400 text-lg font-semibold flex justify-between items-center my-3 py-3">
                <p> Total : &nbsp;</p>
                <span>₹{Number(totalPrice).toFixed(2)}</span>
              </div>

              <div className="text-lg flex justify-between items-center my-3 py-3">
                <button
                  className="cursor-pointer bg-indigo-600 text-white w-full py-2 text-lg tracking-wide focus:outline-none hover:bg-indigo-700 transition-colors duration-300"
                  onClick={proceedToPayment}
                >
                  Proceed To Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
