const express = require('express');
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetpassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUserDetails,
  getSingleUserDetails,
  updateUser,
  deleteUser_admin,
} = require('../controlers/userControler');
const { isAuthenticatedUser, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetpassword);
router.route('/password/update').put(isAuthenticatedUser, updatePassword);

// Get user Details
router.route('/me').get(isAuthenticatedUser, getUserDetails);
// update user profile
router.route('/update/profile').put(isAuthenticatedUser, updateProfile);
// get all users --Admin
router
  .route('/admin/users')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getAllUserDetails);
// get user profile --- { update user } --- { delete user } ---Admin
router
  .route('/admin/user/:id')
  .get(isAuthenticatedUser, authorizedRoles('admin'), getSingleUserDetails)
  .put(isAuthenticatedUser, authorizedRoles('admin'), updateUser)
  .delete(isAuthenticatedUser, authorizedRoles('admin'), deleteUser_admin);

module.exports = router;
