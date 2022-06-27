// Import required functions from mongoose
const { model, Schema } = require('mongoose');

// Create flight schema
const flightSchema = new Schema(
	{
		number: {
			type: Schema.Types.String,
			required: true,
			minLength: 1,
			maxLength: 32,
			index: { unique: true },
			trim: true,
		},
		name: {
			type: Schema.Types.String,
			required: true,
			minLength: 1,
			maxLength: 255,
			trim: true,
		},
		description: {
			type: Schema.Types.String,
			required: true,
			minLength: 1,
			maxLength: 510,
			trim: true,
		},
		document: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		isAchieve: {
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
			required: true,
			default: 'SYSTEM',
		},
	},
	// Define collection to save documents
	{ collection: 'Flight' }
);

// Export schema
module.exports = model('flightSchema', userSchema);
