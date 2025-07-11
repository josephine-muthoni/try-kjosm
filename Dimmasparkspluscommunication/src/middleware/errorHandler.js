// src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack for debugging

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // If status code is still 200, it's an internal server error

    res.status(statusCode).json({
        message: err.message,
        // In production, you might not want to send the stack trace
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = errorHandler;