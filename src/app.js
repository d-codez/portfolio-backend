const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const path = require('path'); // Import the 'path' module
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: 'https://dhruv-prajapati.netlify.app', // Remove the trailing slash
    methods: ['GET', 'POST'],
    credentials: true
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Add this route before your other routes
app.get('/favicon.ico', (req, res) => res.status(204));

// Set up Handlebars view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Centralized error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// MongoDB setup
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Welcome to the backend server!'); // You can change this message
});

// Define API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
