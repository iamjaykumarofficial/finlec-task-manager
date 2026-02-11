const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.W2_89507_Jaykumar,
  password: process.env.Jaykumar241,
  database: process.env.finlec_tasks,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();