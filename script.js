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

addTaskButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskElement = document.createElement('div');
    taskElement.className = 'flex items-center justify-between p-2 bg-gray-700 border-b border-gray-600 rounded mb-2';
    taskElement.innerHTML = `
      <span class="text-white">${taskText}</span>
      <button class="bg-red-500 text-white p-1 rounded" onclick="removeTask(this)">Remove</button>
    `;
    tasksContainer.appendChild(taskElement);
    taskInput.value = '';
    localStorage.setItem('tasks', tasksContainer.innerHTML);
    taskCount.textContent = tasksContainer.children.length;
  }
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTaskButton.click();
  }
});

function removeTask(button) {
  const taskElement = button.parentElement;
  tasksContainer.removeChild(taskElement);
  localStorage.setItem('tasks', tasksContainer.innerHTML);
  taskCount.textContent = tasksContainer.children.length;
}

window.onload = () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasksContainer.innerHTML = savedTasks;
    taskCount.textContent = tasksContainer.children.length;
  }
};