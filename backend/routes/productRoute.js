const express = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createReview,
  deleteReview,
  getProductReviews,
  getAdminProducts,
} = require('../controlers/productControler');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router
  .route('/admin/products/new')
  .post(isAuthenticatedUser, authorizedRoles('admin'), createProduct);
router
  .route('/admin/products/:id')
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteProduct);

router
  .route('/admin/products')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAdminProducts);

router.route('/products').get(getAllProducts);
router.route('/products/:id').get(getProductDetails);
router
  .route('/review')
  .get(getProductReviews)
  .put(isAuthenticatedUser, createReview)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
