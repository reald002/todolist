const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const UsersController = require('../controllers/UsersController.js');
const usersRouter = express.Router();

usersRouter.get('/users', UsersController.getUsers);
usersRouter.delete('/users', UsersController.deleteAll);
usersRouter.delete('/users/:id', UsersController.deleteUser);
usersRouter.post('/register', jsonParser, UsersController.registerNewUser);
usersRouter.post('/login', jsonParser, UsersController.login);

module.exports = usersRouter;
