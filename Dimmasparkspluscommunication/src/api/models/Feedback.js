// src/api/models/Feedback.js
const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email validation
    },
    subject: {
        type: String,
        trim: true,
        default: 'General Inquiry'
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000 // Limit message length
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);