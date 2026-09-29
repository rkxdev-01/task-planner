const errorHandler = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || res.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || 'Unexpected server error.',
  });
};

module.exports = errorHandler;
