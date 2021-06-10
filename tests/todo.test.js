const request = require('supertest');
const server = require('../server');

describe('Get Endpoints', () => {
    it('should get one todo', async () => {
        const res = await request(server).get('/todos/60c1bce85a535b30bfc604bf');
        const {text} = res.body;
        const {color} = res.body;
        const {checked} = res.body;
        expect([text, color, checked]).toEqual(['Работает', 'rgb(128, 0, 128)', false]);
    });
    it('should get one todo', async () => {
        const res = await request(server).get('/todos/60c1bcec5a535b30bfc604c0');
        const {text} = res.body;
        const {color} = res.body;
        const {checked} = res.body;
        expect([text, color, checked]).toEqual(['Ураа', 'rgb(173, 216, 230)', false]);
    });
    it('should get one todo', async () => {
        const res = await request(server).get('/todos/60c1bce65a535b30bfc604be');
        const {text} = res.body;
        const {color} = res.body;
        const {checked} = res.body;
        expect([text, color, checked]).toEqual(['Изумительно', 'rgb(128, 0, 128)', true]);
    });
    it('should get all todos', async () => {
        const res = await request(server).get('/todos/');
        expect(res.body).toEqual([
            {
                color: 'rgb(255, 192, 203)',
                checked: false,
                _id: '60c1bce35a535b30bfc604bd',
                text: 'Все',
                __v: 0
            },
            {
                color: 'rgb(128, 0, 128)',
                checked: true,
                _id: '60c1bce65a535b30bfc604be',
                text: 'Изумительно',
                __v: 0
            },
            {
                color: 'rgb(128, 0, 128)',
                checked: false,
                _id: '60c1bce85a535b30bfc604bf',
                text: 'Работает',
                __v: 0
            },
            {
                color: 'rgb(173, 216, 230)',
                checked: false,
                _id: '60c1bcec5a535b30bfc604c0',
                text: 'Ураа',
                __v: 0
            }
        ]);
    });
});

describe('Post Endpoints', () => {
    it('should post one todo', async () => {
        const res = await request(server).post('/todos/').send({
            'text': 'test-element',
            'color': 'green',
        });
        expect(res.statusCode).toEqual(200);
        expect([res.body.color, res.body.text]).toEqual(['green', 'test-element']);
    });
});
describe('Patch Endpoints', () => {
    it('should change todo text', async () => {
        const res = await request(server).patch('/todos/60c1bce65a535b30bfc604be').send({
            'text': 'Изумительно'
        });
        expect(res.body.text).toEqual('Изумительно');
    });
});
