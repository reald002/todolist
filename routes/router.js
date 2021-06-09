const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const mainController = require('../controllers/mainController.js');
const router = express.Router();

router.get('/', mainController.index);
router.get('/todos', mainController.getTodos);
router.post('/todos', jsonParser, mainController.postTodo);
router.get('/todos/:id', mainController.getTodo);
router.delete('/todos/:id', mainController.deleteTodo);
router.patch('/todos/:id', jsonParser, mainController.patchTodo);

module.exports = router;
