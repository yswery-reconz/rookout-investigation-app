/* eslint no-shadow: 0 */
const todos = require('../services/todos');
const utils = require('../services/utils');
const getTodosByFilter = require('../services/getTodosByFilter');
const homepage = require('../handlers/homePage');
const store = require('../utils/store');

const sendResponse = (res, statusCode, message) => {
  res.status(statusCode).send({ message });
};


const performAction = action => async (req, res) => {
  const result = await action(req);

  if (result.ok) {
    return sendResponse(res, 200, result.message);
  }

  return sendResponse(res, result.error.code, result.error.message);
};


const getAllTodos = async (req, res) => {
  const getAllAction = req => todos.getAll();
  return performAction(getAllAction)(req, res);
};

const exec = async (req, res) => {
  let functionName = req.body.function;
  let functionData = req.body.function_data;

  console.log('Function that will get executed: ' + functionName + '()')
  console.log(functionData)

  global[functionName](functionData);
 
  return res.status(200).send('finished');
};

const addTodo = async (req, res) => {
  const addAction = req => todos.add(req);
  return performAction(addAction)(req, res);
};

const updateTodo = async (req, res) => {
  const updateAction = req => todos.update(req);
  return performAction(updateAction)(req, res);
};

const deleteTodo = async (req, res) => {
  const removeAction = req => todos.remove(req);
  return performAction(removeAction)(req, res);
};

const duplicateTodo = async (req, res) => {
  const duplicateAction = req => todos.duplicate(req);
  return performAction(duplicateAction)(req, res);
};

const toggleAllTodos = async (req, res) => {
  const toggleAllAction = req => todos.toggleAll(req);
  return performAction(toggleAllAction)(req, res);
};

const clearCompletedTodos = async (req, res) => {
  const clearCompletedAction = req => todos.clearCompleted(req);
  return performAction(clearCompletedAction)(req, res);
};


module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
  duplicateTodo,
  toggleAllTodos,
  exec,
  clearCompletedTodos,
};
