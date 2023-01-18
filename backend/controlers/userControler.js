const tryCatchError = require('../middleware/tryCatchError');
const ErrorHandler = require('../utils/errorHandler');
const User = require('../models/userModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a user
exports.registerUser = tryCatchError(async (req, res, next) => {
  const { name, email, password } = req.body;
  let user;
  if (req.body.avatar) {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 300,
      height: 300,
      gravity: 'faces',
      crop: 'fill',
    });
    user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });
  } else {
    user = await User.create({
      name,
      email,
      password,
    });
  }
  sendToken(user, 200, res);
});

// Login user
exports.loginUser = tryCatchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler('Please Enter Email & Password!!', 400));
  }
  //   .select('+password'); used because password select : false in userModel
  let user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Invalid Email or Password!!', 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid Email or Password!!', 401));
  }
  sendToken(user, 200, res);
});
// logout user
exports.logout = tryCatchError(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: 'Logged Out' });
});

//Forgot password
exports.forgotPassword = tryCatchError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }
  // Get reset token
  const resetToken = user.getResetPasswordToken();
  // save user because in userModel(middleware) we only stored values of resetPasswordToken
  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore`;
  try {
    await sendEmail({
      email: user.email,
      subject: 'Ecommerce Password Recovery',
      message,
    });

    res
      .status(200)
      .json({ success: true, message: `Email sent to ${user.email}` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({
      validateBeforeSave: false,
    });
    return next(new ErrorHandler(error.message, 500));
  }
});
// reset password
exports.resetpassword = tryCatchError(async (req, res, next) => {
  // Hashing passwor to match in database
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  let user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler('Reset Password Token Is Invalid or has been Expired')
    );
  }

  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't Match"));
  }
  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  await sendToken(user, 200, res);
});

// Get user self details
exports.getUserDetails = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});
// Update User password
exports.updatePassword = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.user.id).select('+password');
  let resetPassword = await user.comparePassword(req.body.oldPassword);
  if (!resetPassword) {
    return next(new ErrorHandler('Old Password is Incorrrect', 400));
  }
  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler('Password not Match', 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});
// Update User profile
exports.updateProfile = tryCatchError(async (req, res, next) => {
  let userNewData = {
    name: req.body.name,
    email: req.body.email,
  };
  console.log(req.user.avatar);
  if (req.body.avatar) {
    if (req.user.avatar) {
      console.log(req.user.avatar);
      await cloudinary.v2.uploader.destroy(req.user.avatar.url);
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: 'avatars',
      width: 300,
      height: 300,
      gravity: 'faces',
      crop: 'fill',
    });
    userNewData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  let user = await User.findByIdAndUpdate(req.user.id, userNewData, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next(new ErrorHandler("User doesn't Exist!!"));
  }
  res.status(200).json({ success: true });
});
// Update User role --Admin
exports.updateUser = tryCatchError(async (req, res, next) => {
  let user = await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    {
      new: false,
      runValidators: true,
    }
  );
  if (!user) {
    return next(new ErrorHandler("User doesn't Exist!!"));
  }
  res.status(200).json({ success: true });
});
// Get individual user --Admin
exports.getSingleUserDetails = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User not exist!'), 404);
  }
  res.status(200).json({ success: true, user });
});
// Get all user details --Admin
exports.getAllUserDetails = tryCatchError(async (req, res, next) => {
  let users = await User.find();
  res.status(200).json({ success: true, users });
});
// Delete User
exports.deleteUser_admin = tryCatchError(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler('User not exist!'), 404);
  }
  // will delete avatar img later
  await user.deleteOne();
  res.status(201).json({ success: true, message: 'User Deleted Successfully' });
});
