import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';

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
        const { text, completedAt } = req.body;
        if (!text) return res.status(400).json({ error: 'Text property is required' });

        const todo = await prisma.todo.create({
            data: { text, completedAt: completedAt === 'null' ? null : (completedAt ? new Date(completedAt) : null) }
        });

        res.json(todo);
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findUnique({
            where: { id },
        });

        if (!todo) {
            return res.status(404).json({ error: `Todo with id ${id} not found` });
        }

        const { text, completedAt } = req.body;

        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: {
                text: text ?? todo.text,
                completedAt: completedAt === 'null' ? null : (completedAt ? new Date(completedAt) : todo.completedAt),
            },
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