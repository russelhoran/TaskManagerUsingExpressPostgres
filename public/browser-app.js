const taskFormDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');
const tasksContainerDOM = document.querySelector('.tasks-container');
const tasksDOM = document.querySelector('.tasks');

// Function to create task HTML
const createTaskHTML = (task) => {
  const { _id, name, completed } = task;
  const taskHTML = `
    <article class="task">
      <p>${name}</p>
      <div>
        <button class="btn task-btn task-edit-btn" data-id="${_id}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="btn task-btn task-delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </article>
  `;
  return taskHTML;
};

// Function to display tasks
const displayTasks = (tasks) => {
  tasksDOM.innerHTML = '';
  if (tasks && tasks.length > 0) {
    tasks.forEach((task) => {
      const taskHTML = createTaskHTML(task);
      tasksDOM.insertAdjacentHTML('beforeend', taskHTML);
    });
  } else {
    tasksDOM.innerHTML = '<p>No tasks available.</p>';
  }
};


// Function to show alert message
const showAlert = (message, className) => {
  formAlertDOM.textContent = message;
  formAlertDOM.classList.add(className);
  formAlertDOM.style.display = 'block';
  setTimeout(() => {
    formAlertDOM.textContent = '';
    formAlertDOM.classList.remove(className);
    formAlertDOM.style.display = 'none';
  }, 3000);
};

// Function to fetch and display tasks
const fetchTasks = async () => {
  try {
    const { data } = await axios.get('/api/v1/tasks');
    const tasks = data.tasks; // Use 'tasks' instead of 'task'
    displayTasks(tasks);
  } catch (error) {
    console.error(error);
  }
};

// Event delegation for task edit and delete buttons
tasksDOM.addEventListener('click', async (e) => {
  if (e.target.classList.contains('task-edit-btn')) {
    const taskID = e.target.dataset.id;
    const newName = prompt('Enter a new task name:');
    if (newName) {
      try {
        await axios.patch(`/api/v1/tasks/${taskID}`, { name: newName });
        showAlert('Task updated successfully', 'text-success');
        fetchTasks();
      } catch (error) {
        console.error(error);
        showAlert('Error updating task', 'text-danger');
      }
    }
  } else if (e.target.classList.contains('task-delete-btn')) {
    const taskID = e.target.dataset.id;
    const confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      try {
        await axios.delete(`/api/v1/tasks/${taskID}`);
        showAlert('Task deleted successfully', 'text-success');
        fetchTasks();
      } catch (error) {
        console.error(error);
        showAlert('Error deleting task', 'text-danger');
      }
    }
  }
});





// Event listener for task form submission
taskFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  const taskName = taskInputDOM.value.trim();
  if (taskName) {
    try {
      await axios.post('/api/v1/tasks', { name: taskName });
      taskInputDOM.value = '';
      showAlert('Task created successfully', 'text-success');
      fetchTasks();
    } catch (error) {
      console.error(error);
      showAlert('Error creating task', 'text-danger');
    }
  } else {
    showAlert('Please enter a task name', 'text-danger');
  }
});

// Event delegation for task edit and delete buttons
tasksDOM.addEventListener('click', async (e) => {
  if (e.target.classList.contains('task-edit-btn')) {
    const taskID = e.target.dataset.id;
    // Perform edit functionality here
    // ...
  } else if (e.target.classList.contains('task-delete-btn')) {
    const taskID = e.target.dataset.id;
    // Perform delete functionality here
    // ...
  }
});

// Fetch and display tasks on page load
fetchTasks();
