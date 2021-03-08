const app = (function () {
  const TASKS_STORAGE_KEY = "tasks";

  const todoInput = document.getElementById("todoInput");
  const todoListBlock = document.getElementById("todoList");
  const listItemForCopy = getListItemForCopy();

  function getListItemForCopy() {
    const listItemForCopy = document.querySelector(".for-copy").cloneNode(true);
    document.querySelector(".for-copy").remove();
    listItemForCopy.classList.remove("for-copy");
    return listItemForCopy;
  }

  const init = () => {
    toDoList.setOnListChanged((tasks) => {
      console.log("CHANGED", tasks);
      renderElements();
      storage.save(TASKS_STORAGE_KEY, tasks);
    });

    document.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      addTask(todoInput.value);
      todoInput.value = "";
    });

    toDoList.applyLocalData(storage.load(TASKS_STORAGE_KEY) || []);
  };

  const doneElement = (task) => {
    toDoList.toggleTask(task);
  };

  const clickDelete = (task) => {
    toDoList.deleteTask(task);
  };

  const renderElements = () => {
    todoListBlock.innerHTML = ""; //clear our previous list

    toDoList.getTasks().forEach((task) => {
      const newTask = listItemForCopy.cloneNode(true);
      const span = newTask.querySelector("span");
      span.innerHTML = task.task;
      task.isDone ? span.classList.add("done") : span.classList.remove("done");
      todoListBlock.append(newTask);
      newTask.querySelector("button").addEventListener("click", function (e) {
        //add event when user delete the task
        clickDelete(task);
      });
      newTask.querySelector("span").addEventListener("click", function (e) {
        //add event when user done the task
        doneElement(task);
      });
    });
  };

  const addTask = (newTask) => {
    //add new task to the end of array
    const textTasks = toDoList.getTasks();
    if (textTasks.find((item) => item.task.trim() === newTask.trim())) {
      alert("This task is already on the list");
    } else if (newTask === "") {
      alert("An empty task cannot be added");
    } else {
      toDoList.addTask(newTask);
    }
  };

  return {
    init,
  };
})();

// init the app immediately
app.init();
