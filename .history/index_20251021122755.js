const express = require('express');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const rateLimit = require('express-rate-limit');
const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Terlalu banyak percobaan login, coba lagi nanti',
});
require('dotenv').config();

const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth/login', loginLimiter);

const PORT = process.env.PORT || 4000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  const [rows] = await pool.query('SELECT NOW() AS now');
  res.send(`Server ini berjalan 🚀 — Waktu DB: ${rows[0].now}`);
});

app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

