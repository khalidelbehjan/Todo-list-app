let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

loadTasks();

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  let li = createTask(taskText);
  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

function createTask(text) {
  let li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  let delBtn = document.createElement("button");
  delBtn.textContent = "✕";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  };

  li.appendChild(delBtn);
  return li;
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent.trim(),
      done: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let data = localStorage.getItem("tasks");
  if (!data) return;

  JSON.parse(data).forEach(task => {
    let li = createTask(task.text);
    if (task.done) li.classList.add("completed");
    taskList.appendChild(li);
  });
}