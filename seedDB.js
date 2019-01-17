let data =	[
		{
			title: "My first task",
			description: "It's my first"
		},
		{
			title: "My second task",
			description: "It's my second"
		},
		{
			title: "My third task",
			description: "It's my third"
		},
		{
			title: "My fourth task",
			description: "It's my fourth"
		},
		{
			title: "My fifth task",
			description: "It's my fifth"
		},
		{
			title: "My sixth task",
			description: "It's my sixth"
		},
		{
			title: "My seventh task",
			description: "It's my seventh"
		},
		{
			title: "My eight task",
			description: "It's my eight"
		},
		{
			title: "My ninth task",
			description: "It's my ninth"
		},
		{
			title: "My tenth task",
			description: "It's my tenth"
		},
		{
			title: "My eleventh task",
			description: "It's my eleventh"
		},
		{
			title: "My twelfth task",
			description: "It's my twelfth"
		},
	];

const mongoose = require('mongoose');
const Task = require('./app/models/task.model.js');

require('./mongo.js')().then(() => {
	Task.insertMany(data)
	.then((docs, error) => {
		if(!error) {
			console.log('Database seeding done.');
			process.exit(-1);
		}
	});
});