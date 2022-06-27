// Import required node modules
const jwt = require('jsonwebtoken');
const decoder = require('jwt-decode');

// Import config and static enums
const config = require('../config/config');
const staticEnums = require('../lib/staticEnums');

// Roles middleware
const roles = {};

// Create admin authentication
roles.adminAuth = (req, res, next) => {
	// Obtains token from header
	const tokenHeader = req.header('Authorization');
	if (!tokenHeader) {
		return res.status(401).json({ msg: 'Access denied: No token header provided' });
	} else {
		const token = tokenHeader.split(' ')[1];
		const isValidToken = jwt.verify(token, config.TOKEN.KEY);
		if (!isValidToken) {
			return res.status(401).json({ msg: 'Access denied: Invalid token' });
		}
		const payload = decoder(token);
		// Verify that current user is admin
		if (payload.role === staticEnums.ROLES.ADMIN && payload.isAdmin === true) {
			next();
		} else {
			return res.status(401).json({ msg: 'Access denied: Not enought permissions' });
		}
	}
};

// Create user authentication
roles.userAuth = (req, res, next) => {
	// Obtains token from header
	const tokenHeader = req.header('Authorization');
	if (!tokenHeader) {
		return res.status(401).json({ msg: 'Access denied: No token header provided' });
	} else {
		const token = tokenHeader.split(' ')[1];
		const isValidToken = jwt.verify(token, config.TOKEN.KEY);
		if (!isValidToken) {
			return res.status(401).json({ msg: 'Access denied: Invalid token' });
		}
		const payload = decoder(token);
		// Verify that current user is user
		if (payload.role === staticEnums.ROLES.USER && payload.isAdmin === true) {
			next();
		} else {
			return res.status(401).json({ msg: 'Access denied: Not enought permissions' });
		}
	}
};

module.exports = roles;
