// to directly through an error instead of sending response with success false 
// all errors will be handle in global error handler
export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true; // to know that its our custom error
        Error.captureStackTrace(this, this.constructor);
    }
}
