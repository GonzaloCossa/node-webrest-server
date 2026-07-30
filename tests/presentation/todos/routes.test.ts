import request from 'supertest';
import { testServer } from '../../test.server';
import { prisma } from '../../../src/data/postgres/index';

describe('Todo route testing', () => {
    beforeAll(async () => {
        await testServer.start();
    });

    beforeEach(async () => {
        await prisma.todo.deleteMany();
    })

    afterAll(() => {
        testServer.close();
    });

    const todo1 = { text: 'Hola mundo 1' };
    const todo2 = { text: 'Hola mundo 2' };

    test('should return TODOs api/todos', async () => {
        await prisma.todo.createMany({
            data: [todo1, todo2]
        });
        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200);

        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
        expect(body[0].completedAt).toBeNull;
        expect(body[1].completedAt).toBeNull;
    });

    test('should return a TODO api/todos/:id', async () => {
        const todo = await prisma.todo.create({
            data: todo1,
        });

        const { body } = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt,
        });
    });

    test('should return a 404 Not Found api/todos/:id', async () => {
        const todoId = 10000;
        const { body } = await request(testServer.app)
            .get(`/api/todos/${todoId}`)
            .expect(404);

        expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
    });

    test('should return a new TODO api/todos/', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201);

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null,
        });
    });

    test('should return an error 400 if text is not valid api/todos/', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400);

        expect(body).toEqual({ error: 'Text property is required' });
    });

    test('should return an error if text is empty api/todos/', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({ text: '' })
            .expect(400);

        expect(body).toEqual({ error: 'Text property is required' });
    });

    test('should return an updated TODO api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 })
        const [text, date] = ['Hola mundo update', '2026-10-21T00:00:00.000Z'];
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: text, completedAt: date })
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: text,
            completedAt: date
        })
    });

    test('should return 404 if TODO not found api/todos/:id', async () => {
        const todoId = 10000;
        const [text, date] = ['Hola mundo update', '2026-10-21T00:00:00.000Z'];
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todoId}`)
            .send({ text: text, completedAt: date })
            .expect(404);

        expect(body).toEqual({ error: 'Todo with id 10000 not found' });
    });

    test('should return an updated TODO only the date api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 })
        const date = '2026-10-21T00:00:00.000Z';
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: todo.text, completedAt: date })
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: date
        })
    });

    test('should return an updated TODO only the text api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 })
        const text = '2026-10-21T00:00:00.000Z';
        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: text, completedAt: todo.completedAt })
            .expect(200);

        expect(body).toEqual({
            id: todo.id,
            text: text,
            completedAt: todo.completedAt
        })
    });

    test('should delete a TODO api/todos/:id', async () => {
        const todo = await prisma.todo.create({ data: todo1 })

        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todo.id}`)
            .send()
            .expect(200);

        expect(body).toEqual(todo);
    });

    test('should return an 404 error TODO api/todos/:id', async () => {
        const todoId = 10000;
        const { body } = await request(testServer.app)
            .delete(`/api/todos/${todoId}`)
            .send()
            .expect(404);

        expect(body).toEqual({ error: 'Todo with id 10000 not found' });
    });
});