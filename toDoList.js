const toDoList = (() => {
  let tasks = [];
  let i = 0;

  const addTask = (text) => {
    const newTask = {
      id: ++i,
      isDone: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      task: text,
    };
    tasks = [...tasks, newTask];
    console.log(tasks);
    return newTask;
  };

  const toggleTask = (item) => {
    const index = tasks.findIndex((elem) => elem.task === item.task);
    tasks = [
      ...tasks.slice(0, index),
      { ...item, isDone: !item.isDone, updatedAt: new Date().toISOString() },
      ...tasks.slice(index + 1),
    ];
  };

  const applyLocalData = (arr) => {
    tasks = [...arr];
    tasks.forEach((task) => (i = task.id > i ? task.id : i));
  };

  const deleteTask = (item) => {
    tasks = tasks.filter((elem) => elem.task != item.task); //The object is not equal to the same object. It is not the whole object that is to be compared, but certain properties.
  };

  const getTasks = () => {
    return tasks;
  };

  return {
    getTasks,
    addTask,
    toggleTask,
    deleteTask,
    applyLocalData,
  };
})();
