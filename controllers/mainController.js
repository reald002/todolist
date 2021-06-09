const Todos = require('../models/todo');

exports.getTodos = async (req, res) => {
    await Todos.find((err, docs) => {
        res.send(docs);
    });
};

exports.getTodo = async (req, res) => {
    const {id} = req.params;
    const data = await Todos.findById(id);
    res.send(data);
};

exports.postTodo = async (req, res) => {
    const newData = req.body;
    const saveData = new Todos(newData);
    await Todos.create(saveData);
    res.status(200).send(saveData);
};

exports.deleteTodo = async (req, res) => {
    const {id} = req.params;
    const data = await Todos.findByIdAndDelete(id);
    res.status(200).send(data);
};

exports.patchTodo = async (req, res) => {
    const changedTodo = req.body;
    const {id} = req.params;
    await Todos.findByIdAndUpdate(id, changedTodo);
    const data = await Todos.findById(id);
    res.status(200).send(data);
};
