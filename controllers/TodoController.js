const Todos = require('../models/todo');

exports.index = (req, res) => {
    res.status(200).sendFile(__dirname, 'index.html');
};

exports.getTodos = async (req, res) => {
    await Todos.find((err, docs) => {
        res.status(200).send(docs);
    });
};

exports.getTodo = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await Todos.findById(id);
        res.send(data);
    } catch {
        res.status(404).send(`Todo item with id = ${id} not found`);
    }
};
exports.getLastTodo = async (req, res) => {
    try {
        await Todos.find((err, docs) => {
            const data = docs[docs.length-1];
            res.send(data);
        });
    } catch {
        res.status(404).send('Todo item not found');
    }
};

exports.postTodo = async (req, res) => {
    const newData = req.body;
    const saveData = new Todos(newData);
    try {
        await Todos.create(saveData);
        res.status(200).send(saveData);
    } catch {
        res.status(400).send('Error');
    }
};

exports.deleteTodo = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await Todos.findByIdAndDelete(id);
        res.status(200).send(data);
    } catch {
        res.status(404).send(`Todo item with id = ${id} not found`);
    }
};

exports.patchTodo = async (req, res) => {
    const changedTodo = req.body;
    const {id} = req.params;
    try {
        await Todos.findByIdAndUpdate(id, changedTodo);
        const data = await Todos.findById(id);
        res.status(200).send(data);
    } catch {
        res.status(404).send(`Todo item with id = ${id} not found`);
    }
};
