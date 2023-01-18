const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please Enter Product Name'],
  },
  description: {
    type: String,
    required: [true, 'Please Enter Product Description'],
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Product Price'],
    maxLength: [8, 'Price cannot exceed 8 characters'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  category: { type: String, required: [true, 'Please Enter Product Category'] },
  stock: {
    type: Number,
    required: [true, 'Please Enter Product Stock'],
    maxLength: [5, 'Stock cannot exceed 4 chracters'],
    default: 1,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
    },
  ],
  numOfReviews: {
    type: Number,
    default: 0,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

let Product = mongoose.model('Product', productSchema);
Product.createIndexes();
module.exports = Product;
