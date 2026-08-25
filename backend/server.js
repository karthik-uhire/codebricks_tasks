require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const recipesRouter = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/recipes', recipesRouter);

// Root health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: 'Recipe Finder API is running', version: '1.0.0' });
});

// Alias for categories & ingredients for convenience
app.get('/api/categories', (req, res, next) => {
  req.url = '/categories';
  recipesRouter(req, res, next);
});

app.get('/api/ingredients', (req, res, next) => {
  req.url = '/ingredients';
  recipesRouter(req, res, next);
});

// Serve frontend static files if in production or accessed directly
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler - Never leak stack trace to client
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ error: 'An unexpected internal server error occurred' });
});

app.listen(PORT, () => {
  console.log(`🚀 Recipe Finder Backend Server listening at http://localhost:${PORT}`);
});
