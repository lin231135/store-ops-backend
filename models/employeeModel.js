const pool = require("../config/db.config");

const getEmployeeByUsername = async (username) => {
  const result = await pool.query("SELECT * FROM employee WHERE username = $1", [username]);
  return result.rows[0];
};

const createEmployee = async ({ name, role, username, passwordHash }) => {
  const result = await pool.query(
    `INSERT INTO employee (name, role, username, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, role, username`,
    [name, role, username, passwordHash]
  );
  return result.rows[0];
};

module.exports = {
  getEmployeeByUsername,
  createEmployee,
};
