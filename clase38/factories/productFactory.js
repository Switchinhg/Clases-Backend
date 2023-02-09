const ProductDTO = require('../dtos/productDTO');

class ProductFactory {
  static createProductDTO(product) {
    return new ProductDTO(product.name, product.price);
  }
}

module.exports = ProductFactory;