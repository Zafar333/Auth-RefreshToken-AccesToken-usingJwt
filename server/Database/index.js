const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  database: "auth",
  port: 5432,
  user: "postgres",
  password: "admin",
});

module.exports = pool;
