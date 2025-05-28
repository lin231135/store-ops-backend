const Product = require("../models/productModel");

const searchProducts = async (req, res) => {
  try {
    const {
      query,
      page = 1,
      limit = 10,
      minPrice,
      maxPrice,
      inStockOnly,
    } = req.query;

    const searchFilters = {};

    if (query) {
      searchFilters.name = { $regex: query, $options: "i" };
    }

    if (minPrice || maxPrice) {
      searchFilters.price = {};
      if (minPrice) searchFilters.price.$gte = parseFloat(minPrice);
      if (maxPrice) searchFilters.price.$lte = parseFloat(maxPrice);
    }

    if (inStockOnly === "true") {
      searchFilters.stock = { $gt: 0 };
    }

    const products = await Product.find(searchFilters)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ message: "Error interno en búsqueda", error });
  }
};

module.exports = { searchProducts };