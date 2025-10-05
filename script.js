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
  tasks.sort((a, b) => a.localeCompare(b));
  tasks.forEach(taskText => {
    const taskElement = document.createElement('div');
    taskElement.className = 'flex items-center justify-between p-2 bg-gray-700 border-b border-gray-600 rounded mb-2';
    taskElement.innerHTML = `
      <span class="text-white">${taskText}</span>
      <button class="bg-red-500 text-white p-1 rounded" onclick="removeTask(this)">Remove</button>
    `;
    tasksContainer.appendChild(taskElement);
  });
  taskCount.textContent = tasks.length || 'No tasks available';
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    renderTasks(tasks);
    taskInput.value = '';
  }
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click();
  }
});

function removeTask(button) {
  const taskElement = button.parentElement;
  const taskText = taskElement.querySelector('span').textContent;
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(t => t !== taskText);
  renderTasks(tasks);
}

window.onload = () => {
  let tasks = [];
  try {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  } catch {
    tasks = [];
  }
  renderTasks(tasks);
};