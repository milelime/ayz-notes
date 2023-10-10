const express = require('express');
const notesRoutes = require('./routes/notesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the notes routes for any requests to /notes
app.use('/notes', notesRoutes);

// Generic error handling (consider more specific handlers in a real-world application)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;  // Export for potential testing or for more advanced setups (like clustering)
