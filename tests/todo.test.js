const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const mongoose = require('mongoose');
const Todos = require('../models/todo');

const MOCK_DATA =
    {
        color: 'rgb(255, 255, 0)',
        text: 'Работает',
        checked: false
    };

const IDs = [];

beforeAll(async () => {
    const testUrl = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_NAME}/tests`;
    await mongoose.connect(testUrl, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });
    const inserted = await Todos.insertMany([MOCK_DATA]);
    inserted.forEach(e => {
        IDs.push(e._id);
    });
});
afterAll(async () => {
    await Todos.deleteMany();
    await mongoose.disconnect();
});
describe('Get Endpoints', () => {
    it('should get "Работает" todo', async () => {
        const res = await request.get(`/todos/${IDs[0]}`);
        expect([res.body.text, res.body.color, res.body.checked]).toEqual([MOCK_DATA.text, MOCK_DATA.color, MOCK_DATA.checked]);
    });
    it('should get error todo', async () => {
        const res = await request.get('/todos/12345');
        expect(res.text).toEqual('Todo item with id = 12345 not found');
    });
});
describe('Post Endpoints', () => {
    it('should return error todo', async () => {
        const res = await request.post('/todos').send({
            // 'text': 'test-element',
            'color': 'green',
        });
        expect(res.text).toEqual('Error');
    });
    it('should post {"text": "test-element", "color": "green"} todo', async () => {
        const res = await request.post('/todos').send({
            'text': 'test-element',
            'color': 'green',
        });
        expect([res.body.text, res.body.color]).toEqual(['test-element', 'green']);
    });
});
describe('Patch Endpoints', () => {
    it('should change todo.text "Работает" to "Не работает"', async () => {
        const res = await request.patch(`/todos/${IDs[0]}`).send({
            'text': 'Не работает',
        });
        expect(res.body.text).toEqual('Не работает');
    });
    it('should return error"', async () => {
        const res = await request.patch('/todos/12345').send({
            'text': 'Нет',
        });
        expect(res.text).toEqual('Todo item with id = 12345 not found');
    });
});
describe('Delete Endpoints', () => {
    it('should delete "Не работает" todo', async () => {
        const res = await request.delete(`/todos/${IDs[0]}`);
        expect(res.body.text).toEqual('Не работает');
    });
    it('should return error', async () => {
        const res = await request.delete('/todos/123');
        expect(res.text).toEqual('Todo item with id = 123 not found');
    });
});
