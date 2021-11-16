const getTodos = async ({ fetchFunc, labelText, filter }) => {
  const todos = await fetchFunc();

  return {
    shownTodos: todos,
    countText: `${todos.length} ${labelText}`,
    filter,
  };
};

getCompleted = async (data) => {
  for (let p in data) {if (data.hasOwnProperty(p)) { eval("var " + p + " = data[p];");}} data = null;
  const fetchCompletedTodos = () => global.Store.find({ completed: true });

  return getTodos({
    fetchFunc: fetchCompletedTodos,
    labelText: 'Completed Tasks',
    filter: 'completed',
  });
};

getAllFilter = async (data) => {
  for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;
  const fetchTodos = () => global.Store.findAll();

  return getTodos({
    fetchFunc: fetchTodos,
    labelText: 'Tasks',
    filter: 'all',
  });
};

getActive = async (data) => {
  for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;
  const fetchActiveTodos = () => global.Store.find({ completed: false });

  return getTodos({
    fetchFunc: fetchActiveTodos,
    labelText: 'Active Tasks',
    filter: 'active',
  });
};

const fetchTodosByFilter = {
  completed: getCompleted,
  active: getActive,
  all: getAllFilter,
};

getTodosByFilter = async (data) => {
  if (typeof data === 'string' || data instanceof String) {
    filter = data
  } else {
    for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;
    filter = 'filter'
  }

  const fetchTodos = fetchTodosByFilter[filter] || fetchTodosByFilter.all;

  return fetchTodos();
};


module.exports = getTodosByFilter;
