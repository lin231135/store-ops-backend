const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
  const userId = req.user.id; // ← necesitas tener authMiddleware
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "productId y quantity son requeridos" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      p => p.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error al agregar al carrito", error: err.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart) {
      return res.status(200).json({ products: [] }); // carrito vacío
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el carrito", error: err.message });
  }
};

module.exports = { addToCart };