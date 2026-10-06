// Page ke elements pakadte hain
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Saved tasks load karo (browser ki memory se)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Tasks ko screen par dikhane wala function
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = function () {
      deleteTask(index);
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Naya task add karo
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return; // khali task add nahi hoga
  tasks.push(text);
  saveTasks();
  taskInput.value = "";
  renderTasks();
}

// Task delete karo
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Tasks ko browser mein save karo
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") addTask();
});

renderTasks();
