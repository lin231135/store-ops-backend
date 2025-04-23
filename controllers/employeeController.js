const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getEmployeeByUsername } = require("../models/employeeModel"); // ✅ Importación necesaria

const login = async (req, res) => {
  console.log("📥 req.body:", req.body);
  
  const { username, password } = req.body;
  
  try {
    const user = await getEmployeeByUsername(username);
    console.log("🔎 Usuario obtenido:", user);

    if (!user) return res.status(404).json({ message: "Empleado no encontrado" });

    const valid = await bcrypt.compare(password, user.password_hash);
    console.log("🔐 ¿Contraseña válida?:", valid);

    if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token, name: user.name, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { login };