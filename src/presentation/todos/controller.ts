import type { Request, Response } from 'express';
import { CreateTodoDTO, UpdateTodoDTO } from '../../domain/dtos';
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { GetTodos } from '../../domain/use-cases/todo/get-todos';
import { GetTodo } from '../../domain/use-cases/todo/get-todo';
import { CreateTodo } from '../../domain/use-cases/todo/create-todo';
import { UpdateTodo } from '../../domain/use-cases/todo/update-todo';
import { DeleteTodo } from '../../domain/use-cases/todo/delete-todo';

export class TodosController {

    // Inyección de independencias
    constructor(
        private readonly todoRepository: TodoRepository,
    ) { };

    public getTodos = (req: Request, res: Response) => {
        new GetTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }));
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id!;
        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    };

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDTO.create(req.body);
        if (error) return res.status(400).json({ error: error });

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.status(201).json(todo))
            .catch(error => res.status(400).json({ error }));
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id!;
        const [error, updateTodoDto] = UpdateTodoDTO.create({ ...req.body, id });
        if (error) return res.status(400).json({ error });

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id!;
        if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' });

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }));
    };
}