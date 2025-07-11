// src/utils/helpers.js

const formatPrice = (price, currency = 'KES') => {
    return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: currency
    }).format(price);
};

const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// Add other helper functions as needed, e.g., data validation, string manipulation
module.exports = {
    formatPrice,
    capitalizeFirstLetter
};