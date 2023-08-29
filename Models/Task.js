const pool = require('../db/pool'); // Import the PostgreSQL pool connection

const createTask = async (task) => {
  const { name, completed } = task;
  const query = {
    text: 'INSERT INTO tasks (name, completed) VALUES ($1, $2) RETURNING *',
    values: [name, completed],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async () => {
  const query = 'SELECT * FROM tasks';

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getTask = async (taskId) => {
  const query = {
    text: 'SELECT * FROM tasks WHERE id = $1',
    values: [taskId],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateTask = async (taskId, updatedTask) => {
  const { name, completed } = updatedTask;
  const query = {
    text: 'UPDATE tasks SET name = $1, completed = $2 WHERE id = $3 RETURNING *',
    values: [name, completed, taskId],
  };

  try {
    const result = await pool.query(query);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (taskId) => {
    if (!taskId || isNaN(parseInt(taskId))) {
      throw new Error('Invalid task ID');
    }
  
    const query = {
      text: 'DELETE FROM tasks WHERE id = $1 RETURNING *',
      values: [parseInt(taskId)],
    };
  
    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  };

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};
