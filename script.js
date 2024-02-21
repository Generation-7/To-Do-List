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
  localStorage.setItem("data", listContainer.innerHTML);
  let taskElements = listContainer.children;
  let tasks = [];
  for (let index = 0; index < taskElements.length; index++) {
    const taskElement = taskElements[index];
    const taskObject = {
      id: index,
      value: taskElement.innerText.trim(),
      checked: taskElement.classList.contains("checked"),
    };
    tasks.push(taskObject);
  }
  localStorage.setItem("data", JSON.stringify(tasks));
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}

// Add event listener for "Enter" key press
inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

showTask();
