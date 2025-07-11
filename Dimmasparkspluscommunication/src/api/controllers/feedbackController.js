// src/api/controllers/feedbackController.js
const Feedback = require('../models/Feedback');
const { sendFeedbackEmail } = require('../services/emailService');

const submitFeedback = async (req, res, next) => {
    const { name, email, subject, message } = req.body;

    // Basic server-side validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    // You can add more robust email validation here if needed
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    try {
        // Option 1: Save feedback to database (recommended for record-keeping)
        const newFeedback = new Feedback({
            name,
            email,
            subject: subject || 'General Inquiry', // Use default if not provided
            message
        });
        await newFeedback.save();
        console.log('Feedback saved to database.');

        // Option 2: Send email
        const emailSent = await sendFeedbackEmail(name, email, subject || 'General Inquiry', message);

        if (emailSent) {
            res.status(200).json({ message: 'Feedback received and email sent successfully!' });
        } else {
            // If email sending fails, but feedback is saved, you might still consider it a success for the user
            // but log the email failure.
            res.status(202).json({ message: 'Feedback received, but email notification failed to send.' });
        }

    } catch (error) {
        console.error('Error submitting feedback:', error);
        // Pass error to global error handler
        next(error);
    }
};

module.exports = { submitFeedback };