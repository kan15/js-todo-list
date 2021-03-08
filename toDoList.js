const toDoList = (() => {
  let tasks = [];
  let i = 0;
  let onListChanged = (tasks) => {};

  const addTask = (text) => {
    const newTask = {
      id: ++i,
      isDone: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      task: text,
    };
    tasks = [...tasks, newTask];
    onListChanged(tasks);
    return newTask;
  };

  const toggleTask = (item) => {
    const index = tasks.findIndex((elem) => elem.task === item.task);
    tasks = [
      ...tasks.slice(0, index),
      { ...item, isDone: !item.isDone, updatedAt: new Date() },
      ...tasks.slice(index + 1),
    ];
    onListChanged(tasks);
  };

  const applyLocalData = (arr) => {
    tasks = [...arr];
    onListChanged(tasks);
    // tasks.forEach((task) => (i = task.id > i ? task.id : i));
  };

  const deleteTask = (item) => {
    //The object is not equal to the same object. It is not the whole object that is to be compared, but certain properties.
    tasks = tasks.filter((elem) => elem.task != item.task);
    onListChanged(tasks);
  };

  const getTasks = () => {
    return tasks;
  };

  const setOnListChanged = (callback) => {
    onListChanged = callback;
  };

  return {
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
    applyLocalData,
    setOnListChanged,
  };
})();
