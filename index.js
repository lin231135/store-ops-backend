drequire("dotenv").config();
const express = require("express");
const pool = require("./config/db.config");
const employeeRoutes = require("./routes/employeeRoute");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json()); // Habilita JSON en req.body

app.use("/api/employee", employeeRoutes);
//app.use("/api/cart", require("./routes/cartRoute"));

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.get("/api/tenants", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tenants");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error al consultar tenants:", error);
    res.status(500).send("Error interno del servidor");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});