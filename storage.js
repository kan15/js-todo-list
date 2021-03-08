const storage = (() => {
  const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const load = (key) => {
    const item = localStorage.getItem(key);
    return JSON.parse(item);
  };

  const deleteItem = (key) => {};

  return {
    save,
    load,
    delete: deleteItem,
  };
})();
