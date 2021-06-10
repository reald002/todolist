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
    mongoose.disconnect();
    const testUrl = `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@${process.env.CLUSTER_NAME}/tests`;
    await mongoose.connect(testUrl, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });
});
beforeEach(async () => {
    await Todos.deleteMany();
    Todos.insertMany(realDbData.body);
});
afterAll(async () => {
    await Todos.deleteMany();
});
describe('Get Endpoints', () => {
    it('should get one todo', async () => {
        const res = await request.get('/todos/60c25a38340c9c1e1f32641b');
        expect([res.body.text, res.body.color, res.body.checked]).toEqual(['argafdg', 'rgb(255, 192, 203)', false]);
    });
});
describe('Post Endpoints', () => {
    it('should post one todo', async () => {
        const res = await request.post('/todos').send({
            'text': 'test-element',
            'color': 'green',
        });
        expect(res.statusCode).toEqual(200);
        expect([res.body.color, res.body.text]).toEqual(['green', 'test-element']);
    });
});
describe('Delete Endpoints', () => {
    it('should change todo text', async () => {
        const res = await request.delete('/todos/60c25a38340c9c1e1f32641b');
        expect(res.body.text).toEqual('argafdg');
    });
});
