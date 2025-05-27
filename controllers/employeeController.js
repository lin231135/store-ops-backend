const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createEmployee, getEmployeeByUsername } = require("../models/employeeModel");

const login = async (req, res) => {
  console.log("📥 req.body:", req.body);

  const { username, password } = req.body;

  try {
    const user = await getEmployeeByUsername(username);
    console.log("🔎 Usuario obtenido:", user);

    if (!user) return res.status(404).json({ message: "Empleado no encontrado" });

    //const valid = await bcrypt.compare(password, user.password_hash);
    const valid = password === user.password_hash; // Cambiado para usar la contraseña sin hash para simplificar

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

const register = async (req, res) => {
  const { name, role, username, password } = req.body;

  try {
    // Validaciones mínimas
    if (!name || !role || !username || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Verifica si el usuario ya existe
    const existingUser = await getEmployeeByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Nombre de usuario ya registrado" });
    }

    // Hashea la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crea el empleado
    const newEmployee = await createEmployee({ name, role, username, passwordHash });

    res.status(201).json({
      message: "Empleado registrado correctamente",
      employee: {
        id: newEmployee.id,
        name: newEmployee.name,
        role: newEmployee.role,
        username: newEmployee.username
      }
    });
  } catch (err) {
    console.error("Error en el registro:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
};

module.exports = { login, register };
