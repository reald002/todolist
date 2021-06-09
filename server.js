const express = require('express');
const mongoose = require('mongoose');
const app = express();

const router = require('./routes/router.js');
app.use(router);

// to .env /////////////////////////////////////////////////////////////////////////////////////////////////////////
const port = 3001;
const mongoUri = 'mongodb+srv://zebelian:zebelian1@cluster0.qjcyx.mongodb.net/todolist?retryWrites=true&w=majority';
mongoose.connect(mongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// load another way ////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/public/style.css', function(req, res) {
    res.sendFile(__dirname + '/public/style.css');
});

app.get('/public/script.js', function(req, res) {
    res.sendFile(__dirname + '/public/script.js');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
