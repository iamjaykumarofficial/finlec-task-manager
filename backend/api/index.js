const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('../routes/authRoutes');
const taskRoutes = require('../routes/taskRoutes');

const app = express();

app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'https://*.vercel.app']
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes);  // Note: /api prefix not needed, since routes in vercel.json handle /api
app.use('/tasks', taskRoutes);

// Vercel serverless export
module.exports = app;