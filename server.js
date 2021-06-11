const express = require('express');
const dotenv = require('dotenv');
const app = express();
const todosRouter = require('./routes/todosRouter.js');
const usersRouter = require('./routes/usersRouter.js');

app.use(todosRouter);
app.use(usersRouter);
app.use(express.static('public'));

dotenv.config();

module.exports = app;
