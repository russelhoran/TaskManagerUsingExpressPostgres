const asyncWrapper = require('../middleware/async');
const Task = require('../models/Task'); // Import your Task model

// Get all tasks
const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.getAllTasks(); // Replace with your actual function
  res.status(200).json({ tasks });
});

// Create a new task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.createTask(req.body); // Replace with your actual function
  res.status(201).json({ task });
});

// Update a task
const updateTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.updateTask(id, req.body); // Replace with your actual function
  res.status(200).json({ task });
});

// Delete a task
const deleteTask = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const task = await Task.deleteTask(id); // Replace with your actual function
  if (!task) {
    throw createCustomError(`No task with id ${id}`, 404);
  }
  res.status(200).json({ task });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
