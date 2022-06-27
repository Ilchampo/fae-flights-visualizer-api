// Import required node modules
const dotenv = require('dotenv');
const path = require('path');

// Configures dotenv path
dotenv.config({ path: path.join(__dirname, '../../.env') });

// Exports object with configurations
module.exports = {
	// Application settings
	APP: {
		PORT: 3000,
	},
	// Database settings
	MONGO: {
		URI: process.env.DATABASE_URI,
		USER: process.env.DATABASE_USER,
		PASSWORD: process.env.DATABASE_PASSWORD,
	},
	// Token settings
	TOKEN: {
		KEY: process.env.TOKEN_KEY,
		EXPIRE: process.env.TOKEN_EXPIRE,
	},
};
