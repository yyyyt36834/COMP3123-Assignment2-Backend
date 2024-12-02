
// Load the environment variables based on the environment
if (process.env.NODE_ENV === 'docker') {                // NODE_ENV is set in the docker-compose.yml
    require('dotenv').config({ path: './docker.env' });
  } else {
    require('dotenv').config(); 
  }

// Import libraries
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

// Import routes
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');

// Import error handler
const errorHandler = require('./errorHandler');

// From the .env file
const SERVER_PORT = process.env.PORT;

// Connection string
const DB_CONNECTION_STRING = process.env.MONGO_DB_URI;

// Connect to MongoDB
mongoose.connect(DB_CONNECTION_STRING)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));     

// Clean the request URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logger
const loggerMiddleware = (req, res, next) => {
    console.log(`Logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
}
app.use(loggerMiddleware);

// Routes
app.use('/api/v1/emp', employeeRoutes);
app.use('/api/v1/user', userRoutes);

// Handle errors
app.use(errorHandler);

// Listen to the server
app.listen(SERVER_PORT, () => {
    console.log(`Server listening at http://localhost:${SERVER_PORT}`)
})