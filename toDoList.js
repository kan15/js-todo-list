const toDoList = (() => {
  let tasks = [ ];

  const addTask = (text) => {
    const newTask = {id: (new Date()).getTime(), isDone: false, createdAt: new Date(), updatedAt: new Date() ,task: text};
    tasks = [...tasks, newTask];
    return newTask.id;
  };

  const toggleTask = (id) => {
    const index = tasks.findIndex(item => item.id === +id);
    let changeElement = tasks[index];
    changeElement.isDone = !changeElement.isDone;
    changeElement.updatedAt = new Date();
    tasks = [...tasks.slice(0, index), changeElement, ...tasks.slice(index + 1)];
  };

  const deleteTask = (idFromScreen) => {
    const index = tasks.findIndex(item => item.id === +idFromScreen);
    tasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
  };

  const getTasks = () => {
    return tasks;
  }

  return {
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
  };
})();