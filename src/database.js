// Import mongoose module and config file
const mongoose = require('mongoose');
const config = require('./config/config');

// Connects to database via URI
mongoose.connect(config.MONGO.URI);

// Creates a new mongoose connection
const connection = mongoose.connection;

// If connection is established, print message
connection.once('open', () => {
	console.log('connection to database established');
});

// If there was an error, print error and exit process
connection.on('error', (err) => {
	console.log(`connection error ${err}`);
	process.exit(0);
});

// Export mongoose connection
module.exports = connection;
