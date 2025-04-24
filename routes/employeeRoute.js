const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/employeeController");
const { authenticateToken, authorizeAdmin } = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/register", authenticateToken, authorizeAdmin, register);

module.exports = router;
