const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

// 1. IMPORT ROUTES
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

// 2. MIDDLEWARES
app.use(cors());
app.use(express.json()); // Pengganti body-parser yang lebih modern

// 3. GUNAKAN ROUTES 
app.use('/api/auth', authRoutes); // Untuk Login & Register
app.use('/api/list', todoRoutes) // Untuk List, Add, Delete

// 4. JALANKAN SERVER
app.listen(port, () => {
    console.log(`🚀 Backend jalan di http://localhost:${port}`);
});