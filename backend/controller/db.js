const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

// Conexão global
const connection = mysql.createConnection({
  host: 'mysql',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: 3306
});

// Testa a conexão uma vez
connection.connect(err => {
  if (err) console.error('❌ Erro ao conectar:', err.message);
  else console.log('✅ Conectado ao MySQL do Discloud!');
});

// Rota de exemplo
router.get('/', (req, res) => {
  connection.query('SHOW TABLES;', (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
});

module.exports = router;