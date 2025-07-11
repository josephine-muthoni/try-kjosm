// src/api/services/emailService.js
const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer'); // Fallback for local testing/Gmail if SendGrid isn't set up yet

// Set SendGrid API Key if available
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

// Nodemailer transporter (fallback for dev/Gmail, less reliable for production)
let transporter;
if (!process.env.SENDGRID_API_KEY && process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });
}


const sendFeedbackEmail = async (name, email, subject, message) => {
    const feedbackEmailTo = process.env.FEEDBACK_EMAIL_TO;
    const feedbackEmailFrom = process.env.FEEDBACK_EMAIL_FROM || process.env.GMAIL_USER;

    if (!feedbackEmailTo || !feedbackEmailFrom) {
        console.error('Email recipient or sender not configured in .env!');
        return false;
    }

    const emailContent = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br/>
        <p>This feedback was sent from Dimmasparksplus Communication website.</p>
    `;

    const msg = {
        to: feedbackEmailTo,
        from: feedbackEmailFrom, // Must be a verified sender if using SendGrid
        subject: `New Website Feedback: ${subject}`,
        html: emailContent,
    };

    try {
        if (process.env.SENDGRID_API_KEY) {
            await sgMail.send(msg);
            console.log('Feedback email sent via SendGrid successfully!');
        } else if (transporter) {
            await transporter.sendMail(msg);
            console.log('Feedback email sent via Nodemailer (Gmail) successfully!');
        } else {
            console.error('No email sending method configured.');
            return false;
        }
        return true;
    } catch (error) {
        console.error('Error sending feedback email:', error.response ? error.response.body : error);
        return false;
    }
};

module.exports = { sendFeedbackEmail };