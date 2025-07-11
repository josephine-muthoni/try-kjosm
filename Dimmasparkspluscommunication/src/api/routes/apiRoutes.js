// src/api/routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controllers/feedbackController');

// Feedback Route
router.post('/feedback', submitFeedback);

// Example Product Routes (Conceptual - you'd build these out)
// router.get('/products', (req, res) => res.json({ message: 'List of products' }));
// router.get('/products/:id', (req, res) => res.json({ message: `Details for product ${req.params.id}` }));
// router.post('/products', (req, res) => res.json({ message: 'Add new product' }));

module.exports = router;