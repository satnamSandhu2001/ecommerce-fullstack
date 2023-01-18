const Order = require('../models/orderModel');
const tryCatchError = require('../middleware/tryCatchError');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');
const updateStock = require('../utils/updateStock');

// Create new Order
exports.newOrder = tryCatchError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });
  await order.save();
  res.status(201).json({ success: true, order });
});

// Get logged in user's my Orders
exports.myOrders = tryCatchError(async (req, res, next) => {
  let orders = await Order.find({ user: req.user._id });

  res.status(200).json({ success: true, orders });
});
// Get single Order
exports.getSingleOrder = tryCatchError(async (req, res, next) => {
  //  .populate() is used to get data of {ref : "User"} defined in Order Model
  let order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  res.status(200).json({ success: true, order });
});

// Get all Orders --ADMIN
exports.getAllOrders = tryCatchError(async (req, res, next) => {
  let orders = await Order.find();
  let totalPrice = 0;
  orders.forEach((o) => {
    totalPrice += Number(o.totalPrice);
  });
  res.status(200).json({ success: true, orders, totalPrice });
});

// Update Order status
exports.updateStatus = tryCatchError(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler('Order Not Found', 404));
  }
  if (order.orderStatus === 'Delivered') {
    return next(new ErrorHandler('Order has already been delivered', 400));
  }
  order.orderStatus = req.body.orderStatus;
  if (req.body.orderStatus === 'Delivered') {
    order.deliverdAt = Date.now();
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity, 'minus');
    });
  }
  await order.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

// Delete order
exports.deleteOrder = tryCatchError(async (req, res, next) => {
  let order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Doesn't Exists"));
  }
  await order.remove();
  res.status(200).json({ success: true });
});
