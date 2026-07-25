import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/dtos';

export class TodosController {

    // Inyección de independencias
    constructor() { };

    public getTodos = async (req: Request, res: Response) => {
        return res.json(await prisma.todo.findMany());
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todoDB = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        (todoDB) ? res.json(todoDB) : res.status(404).json({ error: `TODO with id ${id} not found` });
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDTO.create(req.body);
        if (error) return res.status(400).json({ error: error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo);
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!;
        const [error, updateTodoDto] = UpdateTodoDTO.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.findUnique({ where: { id } });

        if (!todo) { return res.status(404).json({ error: `Todo with id ${id} not found` }) };

        const updatedTodo = await prisma.todo.update({
            where: { id: id },
            data: updateTodoDto!.values,
        });

        res.json(updatedTodo);
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({
            where: { id },
        });

        if (!todo) {
            return res.status(404).json({ error: `Todo with id ${id} not found` });
        }

        const deleted = await prisma.todo.delete({
            where: { id },
        });

        (deleted) ? res.json(deleted) : res.status(400).json({ error: `Todo with id ${id} not found` })
    };
}