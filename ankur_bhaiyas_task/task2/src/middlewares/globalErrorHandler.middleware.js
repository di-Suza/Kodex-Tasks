
// centralized error handler for all controllers and middleware.
const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went very wrong";
  return res.status(statusCode).json({
    message: message,
    success: false,
  });
};
module.exports = globalErrorHandler;
