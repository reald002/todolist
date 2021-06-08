const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
// const fs = require('fs')
const Schema = mongoose.Schema;

const app = express();
const port = 3000
const jsonParser = bodyParser.json()

const todosScheme = new Schema({
    text: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: "red"
    },
    checked: {
        type: Boolean,
        default: false
    }
});
const Todos = mongoose.model("Todos", todosScheme)
const mongoUri = "mongodb+srv://zebelian:zebelian1@cluster0.qjcyx.mongodb.net/todolist?retryWrites=true&w=majority"
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true })

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
    const listCollections = await mongoose.connection.db.collection("todos", async function(err, collection){
        await collection.find({}).toArray(function(err, data){
            res.send(data)
        })
    })
});
app.get('/todos/:id', async function(req, res) {
    const id = req.params.id
    const data = await Todos.findById(id)
    res.send(data);
});
app.post('/todos', jsonParser, function(req, res) {
    const newData = req.body
    const saveData = new Todos({
        text: newData.text,
        color: newData.color,
        checked: newData.checked
    })
    saveData.save(function(err){
        if(err) return console.log(err);
        res.status(200).send(saveData)
    });
});
app.post('/todos/:id', jsonParser, async function(req, res) {
    const id = req.params.id
    let data = await Todos.findById(id)
    let checked = await data.checked
    checked = !checked
    await Todos.findByIdAndUpdate(id, {
        checked: checked
    })
    data = await Todos.findById(id)
    res.status(200).send(data)
});
app.delete('/todos/:id', jsonParser, async function(req, res) {
    const id = req.params.id
    const data = await Todos.findByIdAndDelete(id)
    res.status(200).send(data)
})
app.patch('/todos/:id', jsonParser, async function (req, res) {
    const changedText = req.body.text
    if(!changedText){
        return res.send("Нет изменений")
    }
    const id = req.params.id
    await Todos.findByIdAndUpdate(id, {
        text: changedText
    })
    const data = await Todos.findById(id)
    res.status(200).send(data)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
