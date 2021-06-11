const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');

const app = express();
const todosRouter = require('./routes/todosRouter.js');
const usersRouter = require('./routes/usersRouter.js');

app.use(todosRouter);
app.use(usersRouter);
app.use(express.static('public'));
app.use(passport.initialize());
require('./middleware/passport')(passport);


module.exports = app;
