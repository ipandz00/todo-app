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
});

module.exports = mongoose.model('Task', taskSchema);