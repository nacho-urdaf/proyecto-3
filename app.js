/* =========================
   DATA STRUCTURE
========================= */
// [
//   {
//     id: timestamp único,
//     text: "texto",
//     completed: false
//   }
// ]

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

/* =========================
   SELECTORS
========================= */
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clearCompleted");

/* =========================
   SAVE TO LOCAL STORAGE
========================= */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* =========================
   ADD TASK
========================= */
function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    alert("La tarea no puede estar vacía");
    return;
  }

  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

/* =========================
   DELETE TASK
========================= */
function deleteTask(id) {
  if (!confirm("¿Eliminar esta tarea?")) return;

  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

/* =========================
   TOGGLE COMPLETE
========================= */
function toggleTask(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

/* =========================
   FILTER TASKS
========================= */
function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter(task => !task.completed);
  }
  if (currentFilter === "completed") {
    return tasks.filter(task => task.completed);
  }
  return tasks;
}

/* =========================
   RENDER TASKS
========================= */
function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  filteredTasks.map(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span>${task.text}</span>
      </div>
      <button class="delete-btn">X</button>
    `;

    li.querySelector("input").addEventListener("change", () => toggleTask(task.id));
    li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(li);
  });

  updateCounter();
  updateClearButton();
}

/* =========================
   UPDATE COUNTER
========================= */
function updateCounter() {
  const pending = tasks.filter(task => !task.completed).length;
  counter.textContent = `${pending} tareas pendientes`;
}

/* =========================
   CLEAR COMPLETED
========================= */
function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
}

function updateClearButton() {
  const hasCompleted = tasks.some(task => task.completed);
  clearCompletedBtn.style.display = hasCompleted ? "block" : "none";
}

/* =========================
   FILTER BUTTON EVENTS
========================= */
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    currentFilter = button.dataset.filter;
    renderTasks();
  });
});

/* =========================
   EVENT LISTENERS
========================= */
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

/* =========================
   INITIAL RENDER
========================= */
renderTasks();