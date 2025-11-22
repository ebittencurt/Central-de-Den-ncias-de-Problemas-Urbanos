const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

// Security & parsing
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginEmbedderPolicy: false
}));
app.use(express.json());
app.use(cors({ 
  origin: config.corsOrigin,
  credentials: true
}));
app.use(rateLimiter);

// Servir arquivos estáticos da pasta uploads com CORS
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Servir arquivos estáticos da pasta imagens-showcase
app.use('/imagens-showcase', express.static(path.join(__dirname, '../imagens-showcase')));

// Routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, status: 404, message: 'Not Found' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
