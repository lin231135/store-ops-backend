const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // otros campos: precio, descripción, stock, etc.
});

module.exports = mongoose.model("Product", productSchema);