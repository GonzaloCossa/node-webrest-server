"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const postgres_1 = require("../../data/postgres");
const dtos_1 = require("../../domain/dtos");
class TodosController {
    // Inyección de independencias
    constructor() { }
    ;
    getTodos = async (req, res) => {
        return res.json(await postgres_1.prisma.todo.findMany());
    };
    getTodoById = async (req, res) => {
        const id = +req.params.id;
        if (isNaN(id))
            return res.status(400).json({ error: 'ID argument is not a number' });
        const todoDB = await postgres_1.prisma.todo.findFirst({
            where: {
                id: id
            }
        });
        (todoDB) ? res.json(todoDB) : res.status(404).json({ error: `TODO with id ${id} not found` });
    };
    createTodo = async (req, res) => {
        const [error, createTodoDto] = dtos_1.CreateTodoDTO.create(req.body);
        if (error)
            return res.status(400).json({ error: error });
        const todo = await postgres_1.prisma.todo.create({
            data: createTodoDto
        });
        res.json(todo);
    };
    updateTodo = async (req, res) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = dtos_1.UpdateTodoDTO.create({ ...req.body, id });
        if (error)
            return res.status(400).json({ error });
        const todo = await postgres_1.prisma.todo.findUnique({ where: { id } });
        if (!todo) {
            return res.status(404).json({ error: `Todo with id ${id} not found` });
        }
        ;
        const updatedTodo = await postgres_1.prisma.todo.update({
            where: { id: id },
            data: updateTodoDto.values,
        });
        res.json(updatedTodo);
    };
    deleteTodo = async (req, res) => {
        const id = +req.params.id;
        if (isNaN(id))
            return res.status(400).json({ error: 'ID argument is not a number' });
        const todo = await postgres_1.prisma.todo.findFirst({
            where: { id },
        });
        if (!todo) {
            return res.status(404).json({ error: `Todo with id ${id} not found` });
        }
        const deleted = await postgres_1.prisma.todo.delete({
            where: { id },
        });
        (deleted) ? res.json(deleted) : res.status(400).json({ error: `Todo with id ${id} not found` });
    };
}
exports.TodosController = TodosController;
//# sourceMappingURL=controller.js.map