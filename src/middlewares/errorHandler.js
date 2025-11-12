module.exports = (err, req, res, next) => {
  console.error('❌ Error:', err);
  const status = err.status || 500;
  res.status(status).json({ 
    success: false, 
    status, 
    message: err.message || 'Internal Server Error' 
  });
};
