const Product = require('../models/productModel');

class ProductDAO {
  static async getProducts() {
    return await Product.find();
  }

  static async createProduct(productData) {
    const product = new Product({
      name: productData.name,
      price: productData.price
    });
    return await product.save();
  }
}

module.exports = ProductDAO;

