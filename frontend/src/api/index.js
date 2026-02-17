// api/index.js (this becomes your serverless entry point)
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('../routes/authRoutes');
const taskRoutes = require('../routes/taskRoutes');
const db = require('../config/db'); // your MySQL pool

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL })); // restrict to your frontend URL
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Export the Express app as a serverless function
module.exports = app;