const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

displayTasks();

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const date = dateInput.value;

  if (taskText === "") {
    alert("Enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    date,
    completed: false
  };

  tasks.push(task);
  saveAndRender();
  taskInput.value = "";
  dateInput.value = "";
}

function displayTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">
        ${task.text} ${task.date ? `(${task.date})` : ""}
      </span>
      <div class="actions">
        <span onclick="toggleTask(${task.id})">✔</span>
        <span onclick="deleteTask(${task.id})">❌</span>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveAndRender();
}

function filterTasks(type) {
  filter = type;
  displayTasks();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}
