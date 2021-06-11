const mongoose = require('mongoose');
const {Schema} = mongoose;

const todosScheme = new Schema({
    text: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: 'rgb(200, 21, 15)'
    },
    checked: {
        type: Boolean,
        default: false
    },
    userId: {
        type: String,
        required: true
    }
});

const Todos = mongoose.model('Todos', todosScheme);
module.exports = Todos;
