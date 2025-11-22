const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const app = express();

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

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/imagens-showcase', express.static(path.join(__dirname, '../imagens-showcase')));

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({ success: false, status: 404, message: 'Not Found' });
});

app.use(errorHandler);

module.exports = app;
