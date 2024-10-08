const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// GET /tasks: Fetch all tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /tasks: Add a new task
router.post('/tasks', async (req, res) => {
    const { title } = req.body;
    try {
        const newTask = new Task({ title });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /tasks/:id: Delete a task by its ID
router.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
