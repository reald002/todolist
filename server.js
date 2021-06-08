const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {Schema} = mongoose;

const app = express();
const port = 3001;
const jsonParser = bodyParser.json();

const todosScheme = new Schema({
    text: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'red'
    },
    checked: {
        type: Boolean,
        default: false
    }
});
const Todos = mongoose.model('Todos', todosScheme);
const mongoUri = 'mongodb+srv://zebelian:zebelian1@cluster0.qjcyx.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/public/style.css', function(req, res) {
    res.sendFile(__dirname + '/public/style.css');
});
app.get('/public/script.js', function(req, res) {
    res.sendFile(__dirname + '/public/script.js');
});
app.get('/todos', async function(req, res) {
    await Todos.find((err, docs) => {
        res.send(docs);
    });
});
app.post('/todos', jsonParser, async function(req, res) {
    const newData = req.body;
    const saveData = new Todos(newData);
    await Todos.create(saveData);
    res.status(200).send(saveData);
});
app.get('/todos/:id', async function(req, res) {
    const {id} = req.params;
    const data = await Todos.findById(id);
    res.send(data);
});
app.delete('/todos/:id', jsonParser, async function(req, res) {
    const {id} = req.params;
    const data = await Todos.findByIdAndDelete(id);
    res.status(200).send(data);
});
app.patch('/todos/:id', jsonParser, async function (req, res) {
    const changedTodo = req.body;
    const {id} = req.params;
    await Todos.findByIdAndUpdate(id, changedTodo);
    const data = await Todos.findById(id);
    res.status(200).send(data);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
