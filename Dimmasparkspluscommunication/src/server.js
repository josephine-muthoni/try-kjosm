// server.js
require('dotenv').config(); // Load environment variables from .env

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000; // Use port from environment or default to 5000

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access at: http://localhost:${PORT}`);
});