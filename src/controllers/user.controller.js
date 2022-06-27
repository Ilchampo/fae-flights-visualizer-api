// Import required node modules
const v = require('validator');
const jwt = require('jsonwebtoken');

// Import user schema and config
const config = require('../config/config');
const User = require('../models/user.model');

// Import static enum
const staticEnums = require('../lib/staticEnums');

// Function to generate a token according to payload
const generateToken = (user) => {
	const token = jwt.sign(
		{
			id: user._id,
			isAdmin: user.isAdmin,
			role: user.role,
			isActive: user.isActive,
		},
		config.TOKEN.KEY,
		{ expiresIn: config.TOKEN.EXPIRE }
	);
	return token;
};

// Creates empty object to store the controller methods
const userController = {};

// Controller to create a new user
userController.CreateUser = async (req, res) => {
	// Request data from body and validate data
	const { firstName, lastName, email, password } = req.body;
	if (!firstName || !lastName || !email || !password) {
		return res.status(400).json({ msg: 'Please complete all the required fields' });
	}
	if (!v.isAlpha(firstName) || !v.isAlpha(lastName) || !v.isEmail(email)) {
		return res.status(400).json({ msg: 'Please enter valid values for the fields' });
	}
	// If data is correct, looks for user with email in database
	try {
		let user = await User.findOne({ email }).lean();
		if (user) {
			return res.status(400).json({ msg: 'User already exists' });
		}
		// If there is no user with that email, create one and save it
		user = new User({
			firstName: v.trim(firstName),
			lastName: v.trim(lastName),
			email: v.normalizeEmail(email),
			password,
		});
		await user.save();
		return res.status(200).json({ msg: 'User created successfully' });
	} catch (err) {
		// Prints and return error
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Controller to sign in as user
userController.SignInUser = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please complete all the required fields' });
	}
	if (!v.isEmail(email)) {
		return res.status(400).json({ msg: 'Please enter valid values for the fields' });
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}
		const isValid = user.comparePassword(password);
		if (!isValid) {
			return res.status(401).json({ msg: 'Incorrect password' });
		}
		const token = generateToken(user);
		return res.status(200).json(token);
	} catch (err) {
		// Prints and return error
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Controller to sign in as admin
userController.SignInAdmin = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please complete all the required fields' });
	}
	if (!v.isEmail(email)) {
		return res.status(400).json({ msg: 'Please enter valid values for the fields' });
	}
	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}
		if (user.isAdmin === false && user.role !== staticEnums.ROLES.ADMIN) {
			return res.status(401).json({ msg: 'Authorization error' });
		}
		if (!user.comparePassword(password)) {
			return res.status(401).json({ msg: 'Incorrect password' });
		}
		const token = generateToken(user);
		return res.status(200).json(token);
	} catch (err) {
		// Prints and return error
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Controller to get all the users by isActive
userController.getUsersByIsActive = async (req, res) => {
	const filter = req.body.activeFilter;
	let filteredUsers = {};
	try {
		const users = await User.find({ isAdmin: false, role: staticEnums.ROLES.USER })
			.select(['-isAdmin', '-role', '-password', '-createdBy'])
			.lean();
		if (!users) {
			return res.status(200).json({ msg: 'No users found' });
		}
		switch (filter) {
			case staticEnums.ACTIVE_FILTER.ACTIVE:
				filteredUsers = Object.values(users).every(
					(isActive) => isActive === ACTIVE_FILTER.ACTIVE
				);
				break;
			case staticEnums.ACTIVE_FILTER.INACTIVE:
				filteredUsers = Object.values(users).every(
					(isActive) => isActive === ACTIVE_FILTER.INACTIVE
				);
				break;
			default:
				filteredUsers = users;
				break;
		}
		return res.status(200).json(filteredUsers);
	} catch (err) {
		// Prints and return error
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Controller to enable or disable a user
userController.EnableDisableUser = async (req, res) => {
	const id = req.params.id;
	if (!id) {
		return res.status(400).json({ msg: 'Id not found' });
	}
	try {
		const user = await User.findById(id);
		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}
		// If true -> false, if false -> true
		user.isActive = !user.isActive;
		await user.save();
		return res.status(200).json({ msg: 'Change made successfully', active: user.isActive });
	} catch (err) {
		// Prints and return error
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Controller to change password of a user
userController.ChangePassword = async (req, res) => {
	const { oldPassword, newPassword, confirmedPassword } = req.body;
	if (!oldPassword || !newPassword || !confirmedPassword) {
		return res.status(400).json({ msg: 'Please complete all the required fields' });
	}
	try {
		
	} catch (err) {
		// Prints and return error
		console.log(err.message);
		return res.status(500).json({ msg: err.message });
	}
};

// Exports object with controller methods
module.exports = userController;
