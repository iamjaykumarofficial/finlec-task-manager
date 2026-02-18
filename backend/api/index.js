// api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('../backend/routes/authRoutes');
const taskRoutes = require('../backend/routes/taskRoutes');

const app = express();

app.use(helmet());
app.use(cors()); // Vercel par simple cors() rakhein ya frontend URL dein
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Root route for health check
app.get('/api', (req, res) => {
  res.send('Finlec API is running...');
});

module.exports = app;