const Product = require('../models/productModel');

const updateStock = async (id, quantity, type) => {
  let product = await Product.findById(id);
  if (type === 'plus') {
    product.stock += quantity;
  } else {
    product.stock -= quantity;
  }
  await product.save({ validateBeforeSave: false });
};

module.exports = updateStock;
