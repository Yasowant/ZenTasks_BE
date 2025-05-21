import { Response } from "express";
import { AuthRequest } from "../types/express";
import * as todoService from '../services/todoService';

export const createTodo = async (req: AuthRequest, res: Response) => {
    const todo = await todoService.createTodo(req.body, req.user!.userId);
    res.status(201).json(todo);
}

export const getTodos = async (req: AuthRequest, res: Response) => {
    const todos = await todoService.getTodos(req.user!.userId);
    res.json(todos);
}

export const getTodoById = async (req: AuthRequest, res: Response) => {
    const todo = await todoService.getTodoById(req.params.id, req.user!.userId);
    if (!todo) {
        res.status(404).json({ message: 'Todo not found' });
        return;
    }
    res.json(todo);
}

export const updateTodo = async (req: AuthRequest, res: Response) => {
  const todo = await todoService.updateTodo(req.params.id, req.body);
  res.json(todo);
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  await todoService.deleteTodo(req.params.id);
  res.json({ message: 'Todo deleted' });
};
