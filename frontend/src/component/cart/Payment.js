import React, { useEffect, useRef } from 'react';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import MetaData from '../layout/MetaData';
import CheckoutSteps from './CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/loader/Loader';
import axios from 'axios';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, createOrder } from '../../actions/orderAction';

const Payment = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error, loading } = useSelector((state) => state.newOrder);

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
  if (!orderInfo) {
    navigate('/cart');
  }

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/v1/payment/process',
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate('/success');
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert]);

  return (
    <>
      <MetaData title="Payment Card Info" />
      {loading ? <Loader /> : null}
      <div className="mt-8 mx-16">
        <CheckoutSteps activeStep={3} />
        <h1 className="mt-24 text-center text-3xl text-indigo-600 border-b border-gray-300 w-fit px-6 mx-auto pb-3">
          Card Info
        </h1>
        <form
          className="max-w-xs mx-auto p-4"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <CreditCardIcon className="text-gray-700" />
            <CardNumberElement className="bg-transparent w-full py-3 focus:outline-none" />
          </div>
          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <EventIcon className="text-gray-700" />
            <CardExpiryElement className="bg-transparent w-full py-3 focus:outline-none" />
          </div>
          <div className="mb-3 border border-gray-300 flex items-center gap-4 px-4">
            <VpnKeyIcon className="text-gray-700" />
            <CardCvcElement className="bg-transparent w-full py-3 focus:outline-none" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="cursor-pointer bg-indigo-600 text-white w-full py-2 text-lg font-Roboto focus:outline-none hover:bg-indigo-700 transition-colors duration-300 tracking-wider"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
