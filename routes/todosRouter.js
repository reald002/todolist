const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const TodoController = require('../controllers/TodoController.js');
const todosRouter = express.Router();

todosRouter.get('/', TodoController.index);
todosRouter.get('/register', TodoController.register);
todosRouter.get('/login', TodoController.login);
todosRouter.get('/todos', TodoController.getTodos);
todosRouter.post('/todos', jsonParser, TodoController.postTodo);
todosRouter.get('/todos/last', TodoController.getLastTodo);
todosRouter.get('/todos/:id', TodoController.getTodo);
todosRouter.delete('/todos/:id', TodoController.deleteTodo);
todosRouter.patch('/todos/:id', jsonParser, TodoController.patchTodo);
module.exports = todosRouter;
