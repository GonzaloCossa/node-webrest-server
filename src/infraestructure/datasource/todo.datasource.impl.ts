import { TodoDatasource } from '../../domain/datasources/todo.datasource';
import { CreateTodoDTO } from '../../domain/dtos/todos/create-todo.dto';
import { TodoEntity } from '../../domain/entities/todo.entity';
import { UpdateTodoDTO } from '../../domain/dtos/todos/update-todo.dto';
import { prisma } from '../../data/postgres/index';

export class TodoDatasourceImpl implements TodoDatasource {
    async create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        return TodoEntity.fromObject(todo);
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo));
    }

    async findById(id: number): Promise<TodoEntity> {
        const todoDB = await prisma.todo.findFirst({
            where: {
                id: id
            }
        });

        if (!todoDB) throw `Todo with id ${id} not found`;
        return TodoEntity.fromObject(todoDB);
    }

    async updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        await this.findById(updateTodoDTO.id);

        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDTO.id },
            data: updateTodoDTO!.values,
        });

        return TodoEntity.fromObject(updatedTodo);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);

        const deleted = await prisma.todo.delete({
            where: { id },
        });

        return TodoEntity.fromObject(deleted);
    }
}