module.exports = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5500',
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS ? parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) : 15 * 60 * 1000,
  rateLimitMax: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX, 10) : 100
};
