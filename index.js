const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

const doneElement = (el) => { //
  el.classList.toggle("done");
  const changeEl = el.parentNode.id;
  toDoList.toggleTask(changeEl);
}

const clickDelete = (el) => {
  const deteledId = el.parentNode.id;
  toDoList.deleteTask(deteledId);
  renderElements();
}

const renderElements = () => {
  todoList.innerHTML = '';//clear our previous list
  const tasks = toDoList.getTasks();
  tasks.forEach(item => { //create new list from our array
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'X';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener("click", function (e) { //add event when user delete the task
      clickDelete(this);
    })

    const newli = document.createElement("li");
    const newSpan = document.createElement("span");
    newSpan.addEventListener("click", function (e) { //add event when user done the task
      doneElement(this);
    })
    newli.id = item.id;
    newSpan.innerHTML = item.task;
    newli.append(newSpan);
    newli.append(deleteBtn);
    todoList.append(newli);
  })
}

const addTaskScreen = (newTask) => { //add new task to the end of array
  const textTasks = toDoList.getTasks();
  if(textTasks.find(item => item.task === newTask)) { 
    alert('This task is already on the list');
  } else {
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'X';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener("click", function (e) { //add event when user delete the task
      clickDelete(this);
    })
    const idForLi = toDoList.addTask(newTask);//create and add tasks to our general array. and get new id from our array for our li
    const newli = document.createElement("li");
    const newSpan = document.createElement("span");
    newli.id = idForLi;
    newSpan.innerHTML = `${newTask}`;
    newSpan.addEventListener("click", function (e) { //add event when user done the task
      doneElement(this);
    })
    newli.append(newSpan);
    newli.append(deleteBtn);
    todoList.append(newli);
  }
}

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  addTaskScreen(todoInput.value);
  todoInput.value = '';
});