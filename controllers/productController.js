const Product = require("../models/productModel");

const searchProducts = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar productos", error });
  }
};

module.exports = { searchProducts };