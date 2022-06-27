// Import required node modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const dotenv = require('dotenv');
const path = require('path');

// Import passport middleware and configuration
const passportAuth = require('./middlewares/passport');
const config = require('./config/config');

// Configures dotenv path
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Creates express app
const app = express();

// Set app port
app.set('port', config.APP.PORT);

// Initialize middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

// Loads passport configuration
passport.use(passportAuth);

// Import routes
app.use('/user', require('./routes/user.routes'));

// Exports express app
module.exports = app;
