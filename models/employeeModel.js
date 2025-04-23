const pool = require("../config/db.config");

const getEmployeeByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM employee WHERE username = $1", [username]);
  return result.rows[0];
};

module.exports = { getEmployeeByUsername };