const Product = require("../models/productModel");

const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" }, // búsqueda insensible a mayúsculas/minúsculas
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar productos", error });
  }
};

module.exports = { searchProducts };