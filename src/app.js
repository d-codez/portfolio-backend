const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: 'https://dhruv-prajapati.netlify.app/', // My frontend URL
    methods: ['GET', 'POST'], // Specify the allowed HTTP methods
    credentials: true // Allow cookies to be sent cross-origin
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'hbs');

// MongoDB setup
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define API routes
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
