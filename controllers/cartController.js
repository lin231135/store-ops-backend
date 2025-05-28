const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: "Se requiere productId y quantity mayor a 0" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: `Stock insuficiente. Solo quedan ${product.stock} unidades.` });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existingProduct = cart.products.find(
      p => p.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Producto agregado al carrito", cart });
  } catch (err) {
    console.error("❌ Error en addToCart:", err);
    res.status(500).json({ message: "Error interno al agregar al carrito", error: err.message });
  }
};

const getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ userId }).populate("products.productId");

    if (!cart || cart.products.length === 0) {
      return res.status(200).json({ message: "Carrito vacío", products: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("❌ Error en getCart:", err);
    res.status(500).json({ message: "Error interno al obtener el carrito", error: err.message });
  }
};

module.exports = { addToCart, getCart };