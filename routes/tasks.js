const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/tasks');

// GET all tasks
router.get('/', getTasks);

// POST create a new task
router.post('/', createTask);

// PUT update a task
router.put('/:id', updateTask);

// DELETE delete a task
router.delete('/:id', deleteTask);

module.exports = router;