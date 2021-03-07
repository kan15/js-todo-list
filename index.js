(function () {
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');

  const listItemForCopy = document.querySelector('.for-copy').cloneNode(true);

  document.querySelector('.for-copy').remove();
  listItemForCopy.classList.remove('for-copy');

  const getInitialDataStorage = () => {
    const items = { ...localStorage };
    const keys = Object.keys(items);
    const prevTasks = [];
    keys.forEach((key) => {
      const task = JSON.parse(localStorage.getItem(key));
      prevTasks.push(task);
    });
    toDoList.applyLocalData(prevTasks);
  };

  window.onload = getInitialDataStorage;

  const doneElement = (task) => {
    const item = JSON.parse(localStorage.getItem(task.id));
    item.isDone = !item.isDone;
    localStorage.removeItem(task.id);
    localStorage.setItem(task.id, JSON.stringify(item));
    toDoList.toggleTask(task);
    renderElements();
  };

  const clickDelete = (task) => {
    localStorage.removeItem(task.id);
    toDoList.deleteTask(task);
    renderElements();
  };

  const renderElements = () => {
    todoList.innerHTML = ''; //clear our previous list
    const items = { ...localStorage };
    const keys = Object.keys(items);
    keys.forEach((key) => {
      const task = JSON.parse(localStorage.getItem(key));
      const newTask = listItemForCopy.cloneNode(true);
      const span = newTask.querySelector('span');
      span.innerHTML = task.task;
      task.isDone ? span.classList.add('done') : span.classList.remove('done');
      newTask.id = key;
      todoList.append(newTask);
      newTask.querySelector('button').addEventListener('click', function (e) {
        //add event when user delete the task
        clickDelete(task);
      });
      newTask.querySelector('span').addEventListener('click', function (e) {
        //add event when user done the task
        doneElement(task);
      });
    });
  };

  const addTaskScreen = (newTask) => {
    //add new task to the end of array
    const textTasks = toDoList.getTasks();
    if (textTasks.find((item) => item.task === newTask)) {
      alert('This task is already on the list');
    } else if (newTask === '') {
      alert('An empty task cannot be added');
    } else {
      //local storage
      const readyTask = toDoList.addTask(newTask);
      localStorage.setItem(readyTask.id, JSON.stringify(readyTask));
      renderElements();
    }
  };

  document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTaskScreen(todoInput.value);
    todoInput.value = '';
  });

  renderElements();
})();
