const express = require('express');
const pool = require('./src/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('✅ Koneksi ke MySQL berhasil!');
    conn.release();
  } catch (err) {
    console.error('❌ Gagal konek ke MySQL:', err.message);
  }
})();

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    res.send(`Server berjalan 🚀 — Waktu DB: ${rows[0].now}`);
  } catch (err) {
    console.error('Koneksi ke database gagal:', err.message);
    res.status(500).send('Database error');
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
