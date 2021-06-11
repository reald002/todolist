const supertest = require('supertest');
const app = require('../server');
const request = supertest(app);
const mongoose = require('mongoose');
const Todos = require('../models/todo');

let realDbData;

beforeAll(async () => {
    const url = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_NAME}/${process.env.DB_NAME}`;
    await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });
    realDbData = await request.get('/todos');
    await mongoose.disconnect();
    const testUrl = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_NAME}/tests`;
    await mongoose.connect(testUrl, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });
});
beforeEach(async () => {
    await Todos.deleteMany();
    await Todos.insertMany(realDbData.body);
});
afterAll(async () => {
    await Todos.deleteMany();
    await mongoose.disconnect();
});
describe('Get Endpoints', () => {
    it('should get "argafdg" todo', async () => {
        const res = await request.get('/todos/60c25a38340c9c1e1f32641b');
        expect([res.body.text, res.body.color, res.body.checked]).toEqual(['argafdg', 'rgb(255, 192, 203)', false]);
    });
    it('should get "Работает" todo', async () => {
        const res = await request.get('/todos/60c25b5fed4b7d23b61c7e8f');
        expect([res.body.text, res.body.color, res.body.checked]).toEqual(['Работает', 'rgb(255, 255, 0)', false]);
    });
    it('should get "Да" todo', async () => {
        const res = await request.get('/todos/last');
        expect([res.body.text, res.body.color, res.body.checked]).toEqual(['Да', 'rgb(0, 191, 255)', false]);
    });
});
describe('Post Endpoints', () => {
    it('should post {"text": "test-element", "color": "green"} todo', async () => {
        const res = await request.post('/todos').send({
            'text': 'test-element',
            'color': 'green',
        });
        expect([res.body.color, res.body.text]).toEqual(['green', 'test-element']);
    });
});
describe('Patch Endpoints', () => {
    it('should change todo.text "Да" to "Нет"', async () => {
        const res = await request.patch('/todos/60c25b64ed4b7d23b61c7e90').send({
            'text': 'Нет',
        });
        expect([res.body.text]).toEqual(['Нет']);
    });
});
describe('Delete Endpoints', () => {
    it('should delete "argafdg" todo', async () => {
        const res = await request.delete('/todos/60c25a38340c9c1e1f32641b');
        expect(res.body.text).toEqual('argafdg');
    });
});
