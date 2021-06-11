const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const UsersController = require('../controllers/UsersController.js');
const usersRouter = express.Router();

usersRouter.get('/users', passport.authenticate('jwt', {session: false}), UsersController.getUsers);
usersRouter.delete('/users', UsersController.deleteAll);
usersRouter.delete('/users/:id', UsersController.deleteUser);
usersRouter.post('/register', jsonParser, UsersController.register);
usersRouter.post('/login', jsonParser, UsersController.login);

module.exports = usersRouter;
