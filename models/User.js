const mongoose = require('mongoose');
const {Schema} = mongoose;

const userScheme = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const Users = mongoose.model('Users', userScheme);

module.exports = Users;
