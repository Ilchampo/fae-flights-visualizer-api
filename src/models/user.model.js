// Import required functions from mongoose and bcrypt
const { model, Schema } = require('mongoose');
const staticEnum = require('../lib/staticEnums');
const bcrypt = require('bcrypt');

// Create user schema
const userSchema = new Schema(
	{
		isAdmin: {
			type: Schema.Types.Boolean,
			required: true,
			default: false,
		},
		role: {
			type: Schema.Types.Number,
			required: true,
			default: staticEnum.ROLES.USER,
		},
		firstName: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			minLength: 1,
			maxlength: 255,
		},
		lastName: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			minLength: 1,
			maxlength: 255,
		},
		email: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			index: { unique: true },
			minlength: 4,
			maxlength: 255,
		},
		password: {
			type: Schema.Types.String,
			required: true,
			trim: true,
			minlength: 8,
			maxlength: 255,
		},
		isActive: {
			type: Schema.Types.Boolean,
			required: true,
			default: false,
		},
		createdOn: {
			type: Schema.Types.Date,
			required: true,
			default: Date.now(),
		},
		createdBy: {
			type: Schema.Types.ObjectId,
			required: false,
		},
	},
	// Define collection to save documents
	{ collection: 'User' }
);

// Before saving, encrypt the user password
userSchema.pre('save', async function (next) {
	const user = this;
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(user.password, salt);
	user.password = hash;
	next();
});

// Compares the user password and returns a boolean
userSchema.methods.comparePassword = async function (password) {
	const isMatch = await bcrypt.compare(password, this.password);
	return isMatch ? isMatch : false;
};

// Export schema
module.exports = model('User', userSchema);
