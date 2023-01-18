const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
const errorMiddleware = require('./middleware/error');
const fileUpload = require('express-fileupload');
const path = require('path');

// config
if (process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').config({ path: 'backend/config/config.env' });
}

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(fileUpload());

console.log(process.env.COOKIE_EXPIRE);
console.log(process.env.JWT_EXPIRE);

// routes import
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');

app.use('/api/v1', productRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', paymentRoute);

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;
