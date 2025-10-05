const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const tasksContainer = document.getElementById('tasks');
const taskCount = document.getElementById('taskCount');
const clearTasksButton = document.getElementById('clearTasksButton');

clearTasksButton.addEventListener('click', () => {
  tasksContainer.innerHTML = '';
  localStorage.removeItem('tasks');
  taskCount.textContent = 'No tasks available';
});

function renderTasks(tasks) {
  tasksContainer.innerHTML = '';

  // Filter out invalid tasks
  tasks = tasks.filter(
    t => t && typeof t.text === 'string' && typeof t.done === 'boolean'
  );

  // Sort: not done first (alphabetically), then done (by doneAt ascending)
  tasks.sort((a, b) => {
    if (a.done === b.done) {
      if (a.done) {
        return (a.doneAt || 0) - (b.doneAt || 0);
      }
      // Ensure both texts are strings
      return (a.text || '').localeCompare(b.text || '');
    }
    return a.done - b.done;
  });

  tasks.forEach((task, idx) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'flex items-center justify-between p-2 bg-gray-700 border-b border-gray-600 rounded mb-2';

    taskElement.innerHTML = `
      <span class="text-white ${task.done ? 'line-through opacity-60' : ''}">${task.text}</span>
      <div>
        ${
          !task.done
            ? `<button class="bg-green-500 text-white p-1 rounded mr-2" onclick="markDone(${idx})">Done</button>`
            : ''
        }
        <button class="bg-red-500 text-white p-1 rounded" onclick="removeTask(${idx})">Remove</button>
      </div>
    `;
    tasksContainer.appendChild(taskElement);
  });

  taskCount.textContent = tasks.length ? `${tasks.filter(t => !t.done).length} tasks left` : 'No tasks available';
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, done: false, doneAt: null });
    renderTasks(tasks);
    taskInput.value = '';
  }
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click();
  }
});

window.markDone = function(idx) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  if (!tasks[idx].done) {
    tasks[idx].done = true;
    tasks[idx].doneAt = Date.now();
    renderTasks(tasks);
  }
};

window.removeTask = function(idx) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(idx, 1);
  renderTasks(tasks);
};

window.onload = () => {
  let tasks = [];
  try {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  } catch {
    tasks = [];
  }
  renderTasks(tasks);
};