// ===============================
// 1. DATA LOAD FROM LOCAL STORAGE
// ===============================

var profile = JSON.parse(localStorage.getItem("profile")) || {
  name: "",
  goal: ""
};

var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

var moneyItems = JSON.parse(localStorage.getItem("moneyItems")) || [];

var darkMode = localStorage.getItem("darkMode") || "off";


// ===============================
// 2. SELECT HTML ELEMENTS
// ===============================

var studentName = document.getElementById("studentName");
var studentGoal = document.getElementById("studentGoal");
var saveProfileBtn = document.getElementById("saveProfileBtn");
var profileResult = document.getElementById("profileResult");

var taskInput = document.getElementById("taskInput");
var addTaskBtn = document.getElementById("addTaskBtn");
var taskList = document.getElementById("taskList");
var taskFilter = document.getElementById("taskFilter");

var moneyTitle = document.getElementById("moneyTitle");
var moneyAmount = document.getElementById("moneyAmount");
var moneyType = document.getElementById("moneyType");
var addMoneyBtn = document.getElementById("addMoneyBtn");
var moneyList = document.getElementById("moneyList");

var totalIncome = document.getElementById("totalIncome");
var totalExpense = document.getElementById("totalExpense");
var balance = document.getElementById("balance");

var mark1 = document.getElementById("mark1");
var mark2 = document.getElementById("mark2");
var mark3 = document.getElementById("mark3");
var mark4 = document.getElementById("mark4");
var calculateGradeBtn = document.getElementById("calculateGradeBtn");
var gradeResult = document.getElementById("gradeResult");

var tipBtn = document.getElementById("tipBtn");
var tipResult = document.getElementById("tipResult");

var darkModeBtn = document.getElementById("darkModeBtn");


// ===============================
// 3. PROFILE FUNCTIONS
// ===============================

function saveProfile() {
  var nameValue = studentName.value.trim();
  var goalValue = studentGoal.value.trim();

  if (nameValue === "" || goalValue === "") {
    alert("Please fill up both fields");
    return;
  }

  profile.name = nameValue;
  profile.goal = goalValue;

  localStorage.setItem("profile", JSON.stringify(profile));

  showProfile();

  studentName.value = "";
  studentGoal.value = "";
}

function showProfile() {
  if (profile.name === "" && profile.goal === "") {
    profileResult.innerHTML = "No profile saved yet.";
  } else {
    profileResult.innerHTML =
      "Name: " + profile.name + "<br>" +
      "Goal: " + profile.goal;
  }
}


// ===============================
// 4. TASK FUNCTIONS
// ===============================

function addTask() {
  var taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  var newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
    date: new Date().toLocaleDateString()
  };

  tasks.push(newTask);

  saveTasks();

  taskInput.value = "";

  showTasks();
}

function showTasks() {
  taskList.innerHTML = "";

  var selectedFilter = taskFilter.value;

  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];

    if (selectedFilter === "completed" && task.completed === false) {
      continue;
    }

    if (selectedFilter === "pending" && task.completed === true) {
      continue;
    }

    var li = document.createElement("li");

    if (task.completed === true) {
      li.classList.add("completed");
    }

    li.innerHTML =
      "<span>" + task.text + " - " + task.date + "</span>" +
      "<div>" +
      "<button class='small-btn done-btn' onclick='toggleTask(" + task.id + ")'>Done</button>" +
      "<button class='small-btn delete-btn' onclick='deleteTask(" + task.id + ")'>Delete</button>" +
      "</div>";

    taskList.appendChild(li);
  }
}

function toggleTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].completed = !tasks[i].completed;
    }
  }

  saveTasks();
  showTasks();
}

function deleteTask(id) {
  var newTasks = [];

  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      newTasks.push(tasks[i]);
    }
  }

  tasks = newTasks;

  saveTasks();
  showTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ===============================
// 5. MONEY TRACKER FUNCTIONS
// ===============================

function addMoney() {
  var titleValue = moneyTitle.value.trim();
  var amountValue = Number(moneyAmount.value);
  var typeValue = moneyType.value;

  if (titleValue === "" || amountValue <= 0) {
    alert("Please enter valid title and amount");
    return;
  }

  var newMoney = {
    id: Date.now(),
    title: titleValue,
    amount: amountValue,
    type: typeValue,
    date: new Date().toLocaleDateString()
  };

  moneyItems.push(newMoney);

  saveMoneyItems();

  moneyTitle.value = "";
  moneyAmount.value = "";

  showMoneyItems();
}

function showMoneyItems() {
  moneyList.innerHTML = "";

  var income = 0;
  var expense = 0;

  for (var i = 0; i < moneyItems.length; i++) {
    var item = moneyItems[i];

    if (item.type === "income") {
      income = income + item.amount;
    } else {
      expense = expense + item.amount;
    }

    var li = document.createElement("li");

    var className = "";

    if (item.type === "income") {
      className = "income-text";
    } else {
      className = "expense-text";
    }

    li.innerHTML =
      "<span class='" + className + "'>" +
      item.title + " - " + item.amount + " (" + item.type + ") - " + item.date +
      "</span>" +
      "<button class='small-btn delete-btn' onclick='deleteMoney(" + item.id + ")'>Delete</button>";

    moneyList.appendChild(li);
  }

  totalIncome.innerHTML = income;
  totalExpense.innerHTML = expense;
  balance.innerHTML = income - expense;
}

function deleteMoney(id) {
  var newMoneyItems = [];

  for (var i = 0; i < moneyItems.length; i++) {
    if (moneyItems[i].id !== id) {
      newMoneyItems.push(moneyItems[i]);
    }
  }

  moneyItems = newMoneyItems;

  saveMoneyItems();
  showMoneyItems();
}

function saveMoneyItems() {
  localStorage.setItem("moneyItems", JSON.stringify(moneyItems));
}


// ===============================
// 6. GRADE CALCULATOR FUNCTIONS
// ===============================

function calculateGrade() {
  var m1 = Number(mark1.value);
  var m2 = Number(mark2.value);
  var m3 = Number(mark3.value);
  var m4 = Number(mark4.value);

  if (mark1.value === "" || mark2.value === "" || mark3.value === "" || mark4.value === "") {
    alert("Please enter all marks");
    return;
  }

  if (m1 < 0 || m2 < 0 || m3 < 0 || m4 < 0) {
    alert("Marks cannot be negative");
    return;
  }

  var total = m1 + m2 + m3 + m4;
  var average = total / 4;
  var grade = "";

  if (average >= 80) {
    grade = "A+";
  } else if (average >= 70) {
    grade = "A";
  } else if (average >= 60) {
    grade = "B";
  } else if (average >= 50) {
    grade = "C";
  } else if (average >= 40) {
    grade = "D";
  } else {
    grade = "Fail";
  }

  gradeResult.innerHTML =
    "Total Marks: " + total + "<br>" +
    "Average: " + average + "<br>" +
    "Grade: " + grade;
}


// ===============================
// 7. RANDOM TIP FUNCTION
// ===============================

var tips = [
  "Study 25 minutes, then take 5 minutes break.",
  "Practice JavaScript every day for at least 30 minutes.",
  "Write code by yourself. Do not only copy.",
  "Make small projects to understand better.",
  "Use console.log() to check your code.",
  "Learn DOM properly because it is very important.",
  "Do not fear errors. Errors help you learn."
];

function showRandomTip() {
  var randomNumber = Math.floor(Math.random() * tips.length);

  tipResult.innerHTML = tips[randomNumber];
}


// ===============================
// 8. DARK MODE FUNCTION
// ===============================

function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "on");
  } else {
    localStorage.setItem("darkMode", "off");
  }
}

function loadDarkMode() {
  if (darkMode === "on") {
    document.body.classList.add("dark");
  }
}


// ===============================
// 9. EVENT LISTENERS
// ===============================

saveProfileBtn.addEventListener("click", saveProfile);
addTaskBtn.addEventListener("click", addTask);
taskFilter.addEventListener("change", showTasks);
addMoneyBtn.addEventListener("click", addMoney);
calculateGradeBtn.addEventListener("click", calculateGrade);
tipBtn.addEventListener("click", showRandomTip);
darkModeBtn.addEventListener("click", toggleDarkMode);


// ===============================
// 10. INITIAL LOAD
// ===============================

showProfile();
showTasks();
showMoneyItems();
loadDarkMode();
