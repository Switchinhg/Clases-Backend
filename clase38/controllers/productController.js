
const ProductDAO = require('../daos/productDAO');
const ProductFactory = require('../factories/productFactory');

exports.getProducts = async (req, res) => {
  console.log(req.body);
  try {
    const products = await ProductDAO.getProducts();
    const productDTOs = products.map(product => ProductFactory.createProductDTO(product));
    res.json(productDTOs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await ProductDAO.createProduct(req.body);
    const productDTO = ProductFactory.createProductDTO(newProduct);
    res.status(201).json(productDTO);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};