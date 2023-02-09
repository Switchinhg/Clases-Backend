// // Archivo de controlador: controllers/productController.js
// const Product = require('../models/productModel');

// exports.getProducts = async (req, res) => {
//   console.log(req.body)
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   // console.log(req.body)
//   const product = new Product({
//     name: req.body.name,
//     price: req.body.price
//   });
//   try {
//     const newProduct = await product.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

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