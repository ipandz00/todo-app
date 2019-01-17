const Task = require('../models/task.model.js');

// Create and Save a new Task
exports.create = (req, res) => {
	// Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Task title can not be empty."
        });
    }

    // Create a Task
    const task = new Task({
        title: req.body.title, 
        description: req.body.description || 'No description availible.'
    });

    // Save Task in the database
    task.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Task."
        });
    });
};

// Retrieve and return all tasks from the database.
exports.findAll = (req, res) => {
	Task.find()
    .then(tasks => {
        res.send(tasks);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving tasks."
        });
    });
};

// Find a single task with a taskId
exports.findOne = (req, res) => {
	Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });            
        }
        res.send(task);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Task not found with id " + req.params.taskId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving task with id " + req.params.taskId
        });
    });
};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {

};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {

};