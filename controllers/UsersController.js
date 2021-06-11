const bcrypt = require('bcryptjs');
const Users = require('../models/User');

exports.getUsers = async (req, res) => {
    try {
        await Users.find((err, docs) => {
            res.status(200).send(docs);
        });
    } catch (e) {
        res.status(404).send(e.reason);
    }
};

exports.login = async (req, res) => {
    try {
        const userData = await req.body;
        const match = await Users.findOne({
            username: userData.username,
            password: userData.password
        });
        if(match){
            res.status(200).send('You are logged in!');
        } else {
            res.status(401).send('Wrong data');
        }
    } catch (e) {
        res.status(404).send(e.reason);
    }
};

exports.deleteAll = async (req, res) => {
    await Users.remove({});
    res.send('All Users Are Removed');
};

exports.registerNewUser = async (req, res) => {
    const userData = await req.body;
    const sameName = await Users.findOne({
        username: userData.username
    });

    if(sameName){
        res.status(401).send(`Имя ${sameName.username} уже занято`);
    } else {
        const usersCount = await Users.find();
        userData.userId = usersCount.length;
        const salt = bcrypt.genSaltSync(10);
        const saveData = new Users({
            username: userData.username,
            password: bcrypt.hashSync(userData.password, salt),
            userId: userData.userId
        });
        try {
            await Users.create(saveData);
            res.status(201).send(saveData);
        } catch {
            res.status(400).send('Error');
        }
    }
};

exports.deleteUser = async (req, res) => {
    const {id} = await req.params;
    try {
        const data = await Users.findByIdAndDelete(id);
        res.status(200).send(data);
    } catch {
        res.status(404).send(`Todo item with id = ${id} not found`);
    }
};

