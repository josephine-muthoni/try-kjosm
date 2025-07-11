// public/js/app.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('Dimmasparksplus Communication website loaded!');

    // --- Handle Feedback Form Submission ---
    const feedbackForm = document.getElementById('feedbackForm');
    const formMessage = document.getElementById('formMessage');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(feedbackForm);
            const data = Object.fromEntries(formData.entries());

            // Clear previous messages
            formMessage.textContent = '';
            formMessage.className = 'form-message'; // Reset classes

            // Basic client-side validation
            if (!data.name || !data.email || !data.message) {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.classList.add('error');
                return;
            }

            try {
                // Show a loading indicator if you have one
                // const submitBtn = feedbackForm.querySelector('button[type="submit"]');
                // submitBtn.disabled = true;
                // submitBtn.textContent = 'Sending...';

                const response = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    formMessage.textContent = result.message;
                    formMessage.classList.add('success');
                    feedbackForm.reset(); // Clear the form
                } else {
                    formMessage.textContent = result.message || 'An error occurred. Please try again.';
                    formMessage.classList.add('error');
                }
            } catch (error) {
                console.error('Error submitting feedback:', error);
                formMessage.textContent = 'Network error or server issue. Please try again later.';
                formMessage.classList.add('error');
            } finally {
                // Hide loading indicator, enable button
                // submitBtn.disabled = false;
                // submitBtn.textContent = 'Send Message';
            }
        });
    }

    // --- Simple product image hover effect (example animation) ---
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        const img = card.querySelector('img');
        if (img) {
            card.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        }
    });

    // Add fade-in animation to main content sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

});