const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const TodoController = require('../controllers/TodoController.js');
const router = express.Router();

router.get('/', TodoController.index);
router.get('/todos', TodoController.getTodos);
router.post('/todos', jsonParser, TodoController.postTodo);
router.get('/todos/:id', TodoController.getTodo);
router.delete('/todos/:id', TodoController.deleteTodo);
router.patch('/todos/:id', jsonParser, TodoController.patchTodo);

module.exports = router;
