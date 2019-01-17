module.exports = (app) => {
    const tasks = require('../controllers/task.controller.js');

    // Create a new Task
    app.post('/api/tasks', tasks.create);

    // Retrieve all Tasks
    app.get('/api/tasks', tasks.findAll);

    // Retrieve a single Task with taskId
    app.get('/api/tasks/:taskId', tasks.findOne);

    // Update a Task with taskId
    app.put('/api/tasks/:taskId', tasks.update);

    // Delete a Task with taskId
    app.delete('/api/tasks/:taskId', tasks.delete);
}