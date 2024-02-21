const inputBox = document.querySelector("#inputBox");
const listContainer = document.querySelector("#listContainer");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerText = inputBox.value;
    let span = document.createElement("span");
    span.innerText = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
  }
  inputBox.value = "";
  saveData();
}
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);
function saveData() {
  let taskElements = listContainer.children;
  let tasks = [];

  for (let index = 0; index < taskElements.length; index++) {
    const taskElement = taskElements[index];

    const taskObject = {
      id: index,
      value: taskElement.firstChild.nodeValue.trim(),
      checked: taskElement.classList.contains("checked"),
    };

    tasks.push(taskObject);
  }

  localStorage.setItem("data", JSON.stringify(tasks));
}

function showTask() {
  let storedData = localStorage.getItem("data");

  if (storedData) {
    let tasks = JSON.parse(storedData);

    tasks.forEach((task) => {
      let li = document.createElement("li");
      li.innerText = task.value;

      if (task.checked) {
        li.classList.add("checked");
      }

      let span = document.createElement("span");
      span.innerText = "\u00d7";

      li.appendChild(span);
      listContainer.appendChild(li);
    });
  }
}

// Add event listener for "Enter" key press
inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

showTask();
