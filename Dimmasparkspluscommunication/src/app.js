// src/app.js
const express = require('express');
const path = require('path');
const apiRoutes = require('./api/routes/apiRoutes'); // Your API routes

const app = express();

// Middleware
app.use(express.json()); // Body parser for JSON requests
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded requests

// Serve static files from the 'public' directory
// This is where your HTML, CSS, JS (frontend build), and images will be served from
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
// All API endpoints will be prefixed with /api (e.g., /api/feedback)
app.use('/api', apiRoutes);

// Catch-all route for SPA history mode (if you go with a React/Vue frontend served from /public)
// If you are serving a single-page application (e.g., React, Vue build),
// this ensures that direct access to sub-routes (like /products/123) works by serving index.html
// This should be AFTER all API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});


// Global error handler middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;