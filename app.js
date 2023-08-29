const express = require('express');
const app = express();
const tasksRouter = require('./routes/tasks');
const pool = require('./db/pool');
const notFound = require('./middleware/not-found'); // Make sure this path is correct
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

app.use(express.json());
app.use(express.static('./public'));

app.use('/api/v1/tasks', tasksRouter);

app.use(notFound); // Make sure the path to the middleware is correct
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await pool.connect();
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.error(error);
  }
}

start();