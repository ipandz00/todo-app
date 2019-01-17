const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
	title: {
		type: String,
		required: true,
		unique: false
	},
	description: {
		type: String,
		required: true,
		unique: false
	}
},
{
	id: false,
	toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

taskSchema.virtual('createdAt')
	.get(function() {
		return this._id.getTimestamp();
	});

module.exports = mongoose.model('Task', taskSchema);