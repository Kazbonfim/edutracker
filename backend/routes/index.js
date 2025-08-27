require('dotenv').config();

const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');

// Pool de conexões
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Index
router.get('/', (req, res) => {
  res.json({ message: "Conectado com sucesso!" });
});

// Listar todos os usuários
router.get('/getdb', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.status(200).json({ usuarios: rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Criar um usuário
router.post('/createUser', async (req, res) => {
  try {
    const { name, email } = req.body;
    // const userId = await createUser(name, email);
    if (!name || !email) {
      console.error('Nome e e-mail são obrigatórios');
    }

    const sql = 'INSERT INTO usuarios (name, email) VALUES (? ,?)'

    const [result] = await pool.query(sql, [name, email]);
    const userId = result.insertId;

    res.status(201).json({
      message: "Usuário criado com sucesso!",
      userId
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
