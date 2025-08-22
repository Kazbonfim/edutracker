const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise'); // usar promise
require('dotenv').config();

// Pool de conexões
const pool = mysql.createPool({
  host: '172.0.44.3',
  port: 3306,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Rota de exemplo
router.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SHOW TABLES;');
    res.json({ tables: results });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

module.exports = router;
