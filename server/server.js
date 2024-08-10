const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const grievanceRoutes = require('./routes/grievance');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); // Correctly parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grievance', grievanceRoutes);
// MongoDB connection
mongoose.connect('mongodb+srv://krishna:krish@cluster0.lpcfi.mongodb.net/grievance_db')
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

// Root route
app.get('/', (req, res) => {
    res.send('Grievance Website API');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
