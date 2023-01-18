import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import { useAlert } from 'react-alert';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';

const OrderDetails = () => {
  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, id, alert, error]);

  return (
    <>
      <MetaData title="Order Details -- Ecommerce" />
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-16 mx-auto container font-Roboto ">
          <h1 className="text-[2.3em] text-indigo-600 font-thin mb-4">
            {order._id && `Order : #${order._id}`}
          </h1>
          <div className="md:grid md:grid-cols-[4fr_7fr] mt-8">
            <div className="border-r-2 border-gray-400">
              <div className="mb-6">
                <h2 className="text-2xl mb-4 font-medium">Shipping Info</h2>
                <div className="mx-8">
                  <div className="flex items-center text-sm mb-4">
                    <p className="font-semibold">Name : &nbsp;</p>{' '}
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div className="flex items-center text-sm mb-4">
                    <p className="font-semibold">Phone : &nbsp;</p>{' '}
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>
                  <div className="text-sm flex items-start mb-4">
                    <p className="whitespace-nowrap font-semibold">
                      Address : &nbsp;
                    </p>{' '}
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl mb-4 font-medium">Payment</h2>
                <div className="mx-8">
                  <div className="flex items-center text-sm mb-4">
                    <p className="font-semibold">PAID</p>
                  </div>
                  <div className="flex items-center text-sm mb-4">
                    <p className="font-semibold">Amount : &nbsp;</p>{' '}
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <h2 className="text-2xl mb-4 font-medium">Order Status</h2>
                <div className="mx-8">
                  <div className="flex items-center text-sm mb-4">
                    {order.orderStatus && (
                      <p className="font-semibold text-sm">
                        {order.orderStatus}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-6">
              <h2 className="text-2xl mb-4 font-medium">Your Cart Items</h2>
              <div>
                {order.orderItems &&
                  order.orderItems.map((item, i) => (
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
                        <Link
                          to={`/product/${item.product}`}
                          className="text-sm"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div className="mr-6">
                        <p className="font-semibold text-sm">
                          {item.quantity} X ₹{item.price} &nbsp; = &nbsp; ₹
                          {item.quantity * item.price}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
