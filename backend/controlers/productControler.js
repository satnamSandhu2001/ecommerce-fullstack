const tryCatchError = require('../middleware/tryCatchError');
const ErrorHandler = require('../utils/errorHandler');
const Product = require('../models/productModel');
const ApiFeatures = require('../utils/apiFeatures');

// Create Products --Admin
exports.createProduct = tryCatchError(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, product });
});

// Get all products
exports.getAllProducts = tryCatchError(async (req, res, next) => {
  let resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductCount = products.length;
  apiFeatures.pagination(resultPerPage);
  // if need to use .find() query again in mongoose we use .clone()
  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductCount,
  });
});

// Get all products admin
exports.getAdminProducts = tryCatchError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});
// Get single product details
exports.getProductDetails = tryCatchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }
  return res.status(200).json({ success: true, product });
});

// Update Product --Admin
exports.updateProduct = tryCatchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  return res.status(200).json({ success: true, product });
});

// Delete Product --Admin
exports.deleteProduct = tryCatchError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }
  await product.remove();
  return res
    .status(200)
    .json({ success: true, message: 'Product Removed Successfully' });
});

// Update Product Reviews
exports.createReview = tryCatchError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const ratingData = {
    user: req.user._id,
    name: req.user.name,
    comment,
    rating: Number(rating),
  };

  let product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product Doesn't Exist", 404));
  }
  let isReviewed = await product.reviews.find((rev) => {
    return rev.user.toString() === req.user._id.toString();
  });

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.user = req.user.id;
        rev.name = req.user.name;
        rev.comment = comment;
        rev.rating = Number(rating);
      }
    });
  } else {
    product.reviews.push(ratingData);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  await product.reviews.forEach((rev) => {
    avg = avg + rev.rating;
  });
  product.rating = avg / product.reviews.length;
  await product.save({
    validateBeforeSave: false,
  });
  res.status(201).json({
    success: true,
  });
});
// Delete Product single Review --Admin
exports.deleteReview = tryCatchError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let rating = 0;

  if (reviews.length === 0) {
    rating = 0;
  } else {
    rating = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
  });
});

// Get Product all Reviews
exports.getProductReviews = tryCatchError(async (req, res, next) => {
  let product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product Doesn't Exist", 404));
  }

  let reviews = [...product.reviews];
  res.status(200).json({ success: true, reviews });
});
