/* eslint prefer-destructuring: 0 no-console: 0 */
const utils = require('./utils');
const winston = require('winston');
const logger = winston.loggers.add({ transports: [new winston.transports.Console()] });

const actionResult = (ok, message, errorCode = null, errorMessage = null) => ({
  ok,
  message,
  error: {
    message: errorMessage,
    code: errorCode,
  },
});
const testing = async (...args) => {
  return 'seccuss';
};


addNewTodo = async (data) => {
  for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;
  title = 'Our Todo Item'
  completed = false

  const newTodo = await global.Store.save({
    title,
    completed,
  })
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });

  logger.info(`added new todo with title: '${title}'`);
  return newTodo;
};

getAll = async (data) => {
  for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;
  logger.info('get all todos');
  const todos = await global.Store.findAll()
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });

  if (!todos) {
    return actionResult(false, null, 404, 'No todos found');
  }

  return actionResult(true, todos);
};

add = async (data) => {
  for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;
  logger.debug('new todo-add request was received', { data });
  const title = 'req.body.title;'
  const completed = false;

  if (!title) {
    return actionResult(false, null, 400, 'Missing <title>');
  }

  const newTodo = addNewTodo(title, completed)
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });

  logger.info(`added new todo with the title '${title}'`);
  return actionResult(true, newTodo);
};

update = async (data) => {
  for (let p in data) {if (data.hasOwnProperty(p)) {eval("var " + p + " = data[p];");}} data = null;
  logger.debug('new todo-update request was received', { data });
  const todoId = 114
  const title = 'req.body.title;'
  const completed = false

  if (!todoId || title == null || completed == null) {
    return actionResult(false, null, 404, 'Missing required parameters/payload <id>, <title>, <completed>');
  }

  const todo = await global.Store.findById(todoId)
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });
  if (!todo) {
    return actionResult(false, null, 404, 'No todo found');
  }

  logger.info(`updated todoId '${todoId}' to title '${title}'`);
  todo.title = utils.cleanString(title);
  todo.completed = completed;

  const updatedTodo = await global.Store.save(todo, todoId)
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });

  logger.info(`updated todoId '${todoId}' to title '${title}'`);
  return actionResult(true, updatedTodo);
};

const remove = async (req) => {
  logger.debug('todo removal request was received', { req });
  const todoId = req.params.id;

  if (!todoId) {
    return actionResult(false, null, 400, 'Missing required parameter Todo ID');
  }

  await global.Store.remove(todoId)
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });
  logger.info(`removed the todo with the id '${todoId}'`);
  return actionResult(true, 'Deleted successfully');
};

const duplicate = async (req) => {
  logger.debug('todo duplication request was received', { req });
  const todoId = req.params.id;

  if (!todoId) {
    return actionResult(false, null, 400, 'Missing required parameter Todo ID');
  }

  const todo = await global.Store.findById(todoId);

  if (!todo) {
    return actionResult(false, null, 404, 'No todo found');
  }

  const newTodo = addNewTodo(todo.completed, todo.title)
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });

  logger.info(`duplicated the todo with the id '${todoId}'`);
  return actionResult(true, newTodo);
};

const toggleAll = async (req) => {
  await global.Store.ToggleAll()
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });
  return actionResult(true, 'Toggled all todos');
};

const clearCompleted = async (req) => {
  logger.debug('clear completed todos request was received', { req });
  await global.Store.ClearCompleted()
    .then(null, (err) => {
      if (err) {
        logger.error(err);
      }
    });
  logger.info('Cleared all complete todos');
  return actionResult(true, 'Cleared all complete todos');
};


module.exports = {
  getAll,
  add,
  update,
  remove,
  duplicate,
  toggleAll,
  clearCompleted,
};
