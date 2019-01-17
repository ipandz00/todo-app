const mongoose = require('mongoose');

// Set the proper env
const env = process.env.NODE_ENV || 'development';
const config = require('./app/config/mongo')[env];

module.exports = () => {
	const envUrl = process.env[config.use_env_variable];
	const localUrl = `mongodb://${ config.host }/${ config.database }`;

	const mongoUrl = envUrl ? envUrl : localUrl;

	return mongoose.connect(mongoUrl, {useNewUrlParser: true});
}