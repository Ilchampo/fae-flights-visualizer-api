// Import required functions from mongoose
const { model, Schema } = require('mongoose');

// Create document schema
const docSchema = new Schema(
	{
		route: {
			type: Schema.Types.String,
			required: true,
			minlength: 1,
			maxlength: 510,
		},
		name: {
			type: Schema.Types.String,
			required: true,
			minlength: 1,
			maxlength: 510,
		},
		extension: {
			type: Schema.Types.String,
			required: true,
			minlength: 1,
			maxlength: 16,
		},
		uploadedOn: {
			type: Schema.Types.Date,
			required: true,
			default: Date.now(),
		},
		uploadedBy: {
			type: Schema.Types.ObjectId,
			required: true,
			unique: false,
		},
	},
	// Define collection to save documents
	{ collection: 'Document' }
);

// Export schema
module.exports = model('Document', docSchema);
